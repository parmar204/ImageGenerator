const { generateImageFromText, changesInImage } = require('../config/generateImage')
const User = require('../models/userModel')
const path = require('path');
const fs = require('fs');   

const generateImage = async (req, res) => {
    try {
        const {prompt} = req.body
        const userId = req.userId
        const user = await User.findById(userId)
        if (!user || !prompt) {
            return res.status(400).json({success: false, message: 'Missing details'})
        }
        if (user.creditBalance <= 0) {
            return res.status(200).json({success: false, message: 'No Credit Balance', creditBalance: user.creditBalance})
        }

        const imageData = await generateImageFromText(prompt)
        if (imageData && imageData.imageBase64) {
            const imageBuffer = Buffer.from(imageData.imageBase64, 'base64')
            const fileExtension = imageData.mimeType.split('/')[1];
            const filename = `ai_generated_${user._id}_${Date.now()}.${fileExtension}`;
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, imageBuffer);
            console.log(`AI-generated image saved: ${filePath}`);
            user.creditBalance -= 1;
            await user.save();
            res.status(200).json({
                success: true,
                message: 'Image Generated Successfully',
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
                creditBalance: user.creditBalance
            })
        } else {
            res.status(500).json({ success: false, error: 'Failed to generate image from AI.' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

const modifyImage = async (req, res) => {
    try {
        const prompt = req.body.prompt; 
        const imageFile = req.file;
        if (!prompt || !imageFile) {
            return res.status(400).send('Missing prompt or image file.');
        }

        const userId = req.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({success: false, message: 'User not found'})
        }

        if (user.creditBalance <= 0) {
            return res.status(200).json({success: false, message: 'No credit balance', creditBalance: user.creditBalance})
        }

        const imagePath = imageFile.path;
        const imageBuffer = fs.readFileSync(imagePath);
        const mimeType = imageFile.mimetype

        const modifiedImage = await changesInImage(prompt, imageBuffer, mimeType)

        if (modifiedImage && modifiedImage.imageBase64) {
            const imageBuffer = Buffer.from(modifiedImage.imageBase64, 'base64')
            const fileExtension = modifiedImage.mimeType.split('/')[1];
            const filename = `ai_generated_${user._id}_${Date.now()}.${fileExtension}`;
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, filename);
            fs.writeFileSync(filePath, imageBuffer);
            console.log(`AI-generated image saved: ${filePath}`);
            user.creditBalance -= 1;
            await user.save();
            res.status(200).json({
                success: true,
                message: 'Image Generated Successfully',
                imageUrl: `${req.protocol}://${req.get('host')}/uploads/${filename}`,
                creditBalance: user.creditBalance
            })
        } else {
            res.status(500).json({ success: false, error: 'Failed to generate image from AI.' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    generateImage, modifyImage
}