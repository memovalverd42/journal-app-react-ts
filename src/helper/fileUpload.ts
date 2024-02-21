import { CloudinaryResponse } from ".";

/**
 * Función para subir una imagen a cloudinary
 * @param file Imagen a subir a cloudinary
 * @returns string con la url de la imagen subida
 */
export const fileUpload = async ( file: File ) => {

  // if ( !file ) throw new Error('No se ha seleccionado un archivo');
  if ( !file ) return null;

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dfwojerdl/upload';

  const formData = new FormData();

  formData.append('file', file );
  formData.append('upload_preset', 'react-journal');

  try {

    const response = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    });

    
    // if ( !response.ok ) throw new Error('Error al subir la imagen');
    if ( !response.ok ) return null;
    
    const data: CloudinaryResponse = await response.json();
    
    return data.secure_url;

  } catch (error: any) {
    console.log(error);
    throw error.message;
  }

}