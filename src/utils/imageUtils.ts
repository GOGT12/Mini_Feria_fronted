export async function resizeImageFile(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality: number = 0.8, // Calidad por defecto del 80%
  outputFormat: string = 'image/jpeg' // Formato por defecto JPEG
): Promise<File | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      const image = new Image();
      image.src = readerEvent.target?.result as string;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          console.error('resizeImageFile: No se pudo obtener el contexto 2D del canvas.');
          resolve(null);
          return;
        }

        let width = image.width;
        let height = image.height;

        // Calcular nuevas dimensiones manteniendo la relación de aspecto
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Dibujar la imagen redimensionada en el canvas
        ctx.drawImage(image, 0, 0, width, height);

        // Convertir el contenido del canvas a un Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Convertir el Blob de nuevo a un File para mantener el nombre original
            const resizedFile = new File([blob], file.name, {
              type: outputFormat,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          } else {
            console.error('resizeImageFile: Error al crear Blob desde el canvas.');
            resolve(null);
          }
        }, outputFormat, quality);
      };

      image.onerror = (errorEvent) => {
        console.error('resizeImageFile: Error al cargar la imagen:', errorEvent);
        resolve(null);
      };
    };

    reader.onerror = (errorEvent) => {
      console.error('resizeImageFile: Error al leer el archivo:', errorEvent);
      resolve(null);
    };

    reader.readAsDataURL(file); // Leer el archivo como Data URL
  });
}
