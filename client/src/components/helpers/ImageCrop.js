import React, { useState, createRef } from "react";
import AvatarEditor from "react-avatar-editor";

const ImageCrop = ({ onExport, imgWidth = 720, imgHeight = 570 }) => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const cropper = createRef();

  const handleChange = (event) => {
    if (event.target.files[0]) setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmitImage = () => {
    if (image) {
      var canvas = cropper.current.getImageScaledToCanvas();
      var context = canvas.getContext("2d");

      var w = canvas.width;
      var h = canvas.height;

      var data;
      data = context.getImageData(0, 0, w, h);
      data = context.getImageData(0, 0, w, h);
      var compositeOperation = context.globalCompositeOperation;
      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "#FFF";
      context.fillRect(0, 0, w, h);
      var imageData = canvas.toDataURL("image/jpeg");
      context.clearRect(0, 0, w, h);
      context.putImageData(data, 0, 0);
      context.globalCompositeOperation = compositeOperation;

      onExport(imageData);
    }
  };

  return (
    <div>
      <AvatarEditor
        className='dropzone'
        width={parseInt(imgWidth)}
        height={parseInt(imgHeight)}
        border={0}
        crossOrigin={"anonymous"}
        scale={scale}
        image={image}
        ref={cropper}
        style={{ height: (615 * parseInt(imgHeight)) / parseInt(imgWidth) }}
        onLoadSuccess={onSubmitImage}
        onPositionChange={onSubmitImage}
      />
      <input
        type='range'
        min='0.5'
        max='3'
        step='any'
        value={scale}
        onChange={(e) => setScale(parseFloat(e.target.value))}
      />
      <input type='file' onChange={handleChange} />
      <div id='alpha-image'></div>
    </div>
  );
};

export default ImageCrop;
