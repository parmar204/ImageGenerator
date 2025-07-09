const { generateImageFromText, changesInImage } = require('../config/generateImage')
const User = require('../models/userModel')
const path = require('path');
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing details' });
    }

    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
    }

    const imageData = await generateImageFromText(prompt);

    if (imageData && imageData.imageBase64) {
      const fileExtension = imageData.mimeType.split('/')[1];
      const uploadResult = await cloudinary.uploader.upload(`data:${imageData.mimeType};base64,${imageData.imageBase64}`, {
        folder: 'ai_generated',
        public_id: `image_${user._id}_${Date.now()}`,
        resource_type: 'image',
      });

      user.creditBalance -= 1;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Image Generated Successfully',
        imageUrl: uploadResult.secure_url,
        creditBalance: user.creditBalance
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to generate image from AI.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const modifyImage = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const imageFile = req.file;

    if (!prompt || !imageFile) {
      return res.json({ success: false, message: 'Missing prompt or image file.' });
    }

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance <= 0) {
      return res.status(200).json({ success: false, message: 'No credit balance', creditBalance: user.creditBalance });
    }

    const imageBuffer = imageFile.buffer
    const mimeType = imageFile.mimetype;

    const modifiedImage = await changesInImage(prompt, imageBuffer, mimeType);

    if (modifiedImage && modifiedImage.imageBase64) {
      const uploadResult = await cloudinary.uploader.upload(`data:${modifiedImage.mimeType};base64,${modifiedImage.imageBase64}`, {
        folder: 'ai_generated',
        public_id: `image_${user._id}_${Date.now()}`,
        resource_type: 'image',
      });

      user.creditBalance -= 1;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Image Modified Successfully',
        imageUrl: uploadResult.secure_url,
        creditBalance: user.creditBalance
      });
    } else {
      res.status(500).json({ success: false, error: 'Failed to generate image from AI.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {generateImage, modifyImage}