import { Check, X } from "lucide-react";
import { useCallback, useState } from "react";
import { getCroppedImage } from "../utilities/cropImage";
import Cropper from "react-easy-crop";

const ImageCropper = ({image, aspect = 3/4, croppedImage, isCropping }) =>{
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) =>{
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        const {blob, fileUrl} = await getCroppedImage(image, croppedAreaPixels);
        croppedImage({blob, fileUrl});
        isCropping(false)
    }

    return (
        <div className="relative w-full h-64 bg-gray-200">
           <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
           />
            <button
                className="btn btn-error btn-sm py-5 absolute bottom-2 right-2"
                onClick={() => isCropping(false)}
            >
                <X />
            </button>
            <button
                className="btn btn-success btn-sm py-5 absolute bottom-2 right-20"
                onClick={() => handleSave()}
            >
                <Check />
            </button>
           
        </div>
    )
}

export default ImageCropper; 