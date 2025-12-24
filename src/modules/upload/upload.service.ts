import cloudinary from "./cloudinary";

export const uploadImage = async (filePath: string, folder = "app") => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};
