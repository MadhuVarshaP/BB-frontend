import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dv0frgqvj",
  api_key: "242344273154512",
  api_secret: "pUACbcUmOz7l41NUUXFJHjQvEK4", // Avoid exposing sensitive keys in frontend code
});

export async function POST(req, res) {
  try {
    // Get the image URL from the request body
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: "shoes", // You can adjust this or make it dynamic
    });

    // Optimize the image URL with auto format and quality
    const optimizedUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    // Auto crop the image
    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    return res.status(200).json({
      uploadResult,
      optimizedUrl,
      autoCropUrl,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to upload and process the image." });
  }
}
