const { GoogleGenAI, Modality } = require('@google/genai')

const main = async (promptText) => {
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_KEY
        })

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: promptText,
            // generationConfig: {
            //     responseMimeType: ["image/png"]
            // }
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            }
        })

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const imageBase64 = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType;

                    console.log(`Generated image (first 50 chars of base64): ${imageBase64.substring(0, 50)}...`);
                    console.log(`Mime Type: ${mimeType}`);

                    return { imageBase64, mimeType };
                }
            }
        }

        console.warn("No image data found in the API response for the given prompt.");
        return null;

    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}

module.exports = { main };