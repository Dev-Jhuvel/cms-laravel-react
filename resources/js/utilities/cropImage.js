export const getCroppedImage = (imageSource, croppedAreaPixels ) =>{
    return new Promise((resolve, reject) =>{
        const image = new Image();
        image.src = imageSource;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );


            canvas.toBlob((blob) =>{
                const fileUrl = URL.createObjectURL(blob);
                resolve({blob, fileUrl});
            }, "image/jpeg")
        }
        image.onerror = (error) => reject(error);
    })
}