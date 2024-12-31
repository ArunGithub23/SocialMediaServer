const cloudinary = require('cloudinary').v2;
const sharp = require('sharp'); // Used for image compression
const streamifier = require('streamifier'); // Converts buffer to stream

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret
});

// Middleware to upload to Cloudinary and compress the file
const uploadToCloudinary = (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // Compress the file to 50KB using sharp
    sharp(req.file.buffer)
        .resize({ width: 800 }) // Resize to maintain reasonable quality
        .toBuffer((err, buffer) => {
            if (err) {
                return res.status(500).send('Error while compressing the image');
            }

            // Upload compressed image to Cloudinary
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', // Auto-detects whether it's an image, video, etc.
                    folder:'SociaLink',
                    public_id: `uploads/${Date.now()}`, // Use a dynamic public ID
                },
                (error, result) => {
                    if (error) {
                        return res.status(500).send('Error uploading to Cloudinary');
                    }

                    // Attach the result (Cloudinary URL) to req
                    req.cloudinaryResult = result;
                    next(); // Pass control to the next middleware or route handler
                }
            );

            // Convert buffer to stream and pipe to Cloudinary
            streamifier.createReadStream(buffer).pipe(uploadStream);
        });
};

module.exports = uploadToCloudinary;
