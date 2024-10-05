import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dv0frgqvj",
  api_key: "242344273154512",
  api_secret: "pUACbcUmOz7l41NUUXFJHjQvEK4", // Avoid exposing sensitive keys in frontend code
});

export async function POST(req) {
  try {
    // Parse the request body to get the image URL
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "Image URL is required" }), {
        status: 400,
      });
    }

    // Upload the image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      public_id: "shoes", // You can adjust this or make it dynamic
    });

    // Generate optimized image URLs
    const optimizedUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    // Return the results
    return new Response(
      JSON.stringify({
        uploadResult,
        optimizedUrl,
        autoCropUrl,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to upload and process the image." }),
      { status: 500 }
    );
  }
}
