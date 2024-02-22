import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../src/helper/fileUpload';
/* eslint-disable no-undef */

cloudinary.config({ 
  cloud_name: 'dfwojerdl', 
  api_key: '518488381441283', 
  api_secret: 'T05G_MQEFZZtGke5TgqqzHlvOWg' ,
  secure: true
});

describe('Pruebas en carga de archivos', () => {
  
  test('dede de subir el archivo correctamente a cloudinary', async() => {
    
    const imageUrl = 'https://www.shutterstock.com/image-vector/batman-design-logo-sign-icon-600nw-2317334183.jpg';
  
    const response =  await fetch( imageUrl );

    const blob = await response.blob();

    const file = new File([blob], 'batman.jpg');

    const url = await fileUpload( file );

    expect( typeof url ).toBe('string');

    // console.log(url);
    const segments = url!.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    await cloudinary.api.delete_resources([ 'journal/' + imageId ]);

  }, 10000);

  test('dede de retornar null', async() => {
      

    const file = new File([], 'batman.jpg');

    const url = await fileUpload( file );

    expect( url ).toBe( null );

  });

});