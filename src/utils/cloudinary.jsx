import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "../app/config";
import axios from "axios";

export const cloudinaryUpload = async (image) => {
  if (!image) return "";
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    console.log("CLOUDINARY_CLOUD_NAME:", CLOUDINARY_CLOUD_NAME);
    console.log("CLOUDINARY_UPLOAD_PRESET:", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios({
      url: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      method: "POST",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("API key used in the request:", response.config.headers["X-Requested-With"]);
    
    const imageUrl = response.data.secure_url;
    return imageUrl;
  } catch (error) {
    throw error;
  }
};
