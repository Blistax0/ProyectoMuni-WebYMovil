import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadService = {
  /**
   * Sube una imagen a Cloudinary (acepta Base64 o ruta de archivo)
   * @param fileString
   * @returns URL pública de la imagen alojada en la nube
   */
  subirImagen: async (fileString: string): Promise<string> => {
    try {
      const response = await cloudinary.uploader.upload(fileString, {
        folder: 'sigep_incidentes', // Crea automáticamente una carpeta en la nube
        resource_type: 'image'
      });
      return response.secure_url; // URL https permanente
    } catch (error: any) {
      throw new Error(`Error al subir imagen a Cloudinary: ${error.message}`);
    }
  }
};