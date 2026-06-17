"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadService = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploadService = {
    /**
     * Sube una imagen a Cloudinary (acepta Base64 o ruta de archivo)
     * @param fileString
     * @returns URL pública de la imagen alojada en la nube
     */
    subirImagen: async (fileString) => {
        try {
            const response = await cloudinary_1.v2.uploader.upload(fileString, {
                folder: 'sigep_incidentes', // Crea automáticamente una carpeta en la nube
                resource_type: 'image'
            });
            return response.secure_url; // URL https permanente
        }
        catch (error) {
            throw new Error(`Error al subir imagen a Cloudinary: ${error.message}`);
        }
    }
};
