const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res, next) => {
    try {
        const { image } = req.body; // Extract base64 image

        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        // Remove metadata (e.g., "data:image/png;base64,")
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
            folder: 'crack_images',
            format: 'png',
        });

        // Store image URL in request object
        req.imageUrl = uploadedImage.secure_url;
        next(); // Pass control to the next middleware/controller
    } catch (error) {
        console.error('Image upload failed:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
};

module.exports = uploadImage;
