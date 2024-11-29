import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloud = async (image) => {
    try {
      const result = await cloudinary.uploader.upload(image.path);
      return result.secure_url; 
    } catch (error) {
      throw new Error("Image upload failed: " + error.message);
    }
  };
  