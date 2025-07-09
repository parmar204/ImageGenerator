const { GoogleGenAI, Modality } = require('@google/genai')


const GEMINI_KEY = process.env.GEMINI_KEY

if (!GEMINI_KEY) {
    console.error("Error: GEMINI_KEY environment variable is not set.");
    process.exit(1);
}

const genAI = new GoogleGenAI({
    apiKey: GEMINI_KEY
});

const IMAGE_GENERATION_MODEL = "gemini-2.0-flash-preview-image-generation";

const extractImageData = (candidate) => {
    if (candidate && candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
            if (part.inlineData) {
                const imageBase64 = part.inlineData.data;
                const mimeType = part.inlineData.mimeType;
                console.log(`Generated image (first 50 chars of base64): ${imageBase64.substring(0, 50)}...`);
                console.log(`Mime Type: ${mimeType}`);
                return { imageBase64, mimeType };
            }
        }
    }
    return null;
}

const generateImageFromText = async (promptText) => {
    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: promptText,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            }
        })

        if (response.candidates && response.candidates.length > 0) {
            const imageData = extractImageData(response.candidates[0]);
            if (imageData) {
                return imageData;
            }
        }

        console.warn("No image data found in the API response for the given prompt.");
        return null;

    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}

const changesInImage = async (promptText, imageBuffer, mimeType) => {
    try {
        if (!imageBuffer || !mimeType) {
            throw new Error("Image buffer and MIME type are required for image modification.");
        }

        const contents = [
            { text: promptText },
            {
                inlineData: {
                    mimeType: mimeType,
                    data: imageBuffer.toString("base64")
                }
            }
        ]

        const response = await genAI.models.generateContent({
            model: IMAGE_GENERATION_MODEL,
            contents,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            }
        })

        if (response.candidates && response.candidates.length > 0) {
            const imageData = extractImageData(response.candidates[0]);
            if (imageData) {
                return imageData;
            }
        }

        console.warn("No image data found in the API response for the given prompt.");
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
}

module.exports = { generateImageFromText, changesInImage };