import React, { useState, createRef } from "react";
import AvatarEditor from "react-avatar-editor";

const SimpleImageCrop = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [final, setFinal] = useState("");
  const cropper = createRef();

  const handleChange = (event) => {
    if (event.target.files[0]) setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onClickSave = () => {
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
      
      setFinal(imageData);
    }
  };

  return (
    <div>
      <h1 className='title'>Simple Test Crop</h1>

      <AvatarEditor
        className='dropzone'
        width={720}
        height={570}
        border={0}
        crossOrigin={"anonymous"}
        scale={scale}
        image={image}
        ref={cropper}
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
      {image}
      <button onClick={onClickSave}>View Cropped Image</button>
      <br />
      <br />
      <img src={final} alt='' />
    </div>
  );
};

export default SimpleImageCrop;
