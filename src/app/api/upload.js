// pages/api/upload.js
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dv0frgqvj",
  api_key: "242344273154512", // Your Cloudinary API key
  api_secret: "pUACbcUmOz7l41NUUXFJHjQvEK4", // Your Cloudinary API secret
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { file } = req.body; // Get the file from the request

    try {
      // Upload the file to Cloudinary
      const result = await cloudinary.v2.uploader.upload(file, {
        folder: "bountybridge_profiles", // Optional: specify a folder in Cloudinary
      });

      // Return the image URL
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return res.status(500).json({ error: "Upload failed." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
