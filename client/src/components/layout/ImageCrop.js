import React, { useState, createRef } from "react";
import AvatarEditor from "react-avatar-editor";

import water from "../../icons/water.svg";
import watermark from "watermarkjs";

const ImageCrop = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const cropper = createRef();

  const handleChange = (event) => {
    if (event.target.files[0]) setImage(URL.createObjectURL(event.target.files[0]));
  };

  const onClickSave = () => {
    if (image) {
      console.log(cropper);

      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas1 = cropper.current.getImage().toDataURL();
      console.log("canvas", canvas1);
      const canvas2 = cropper.current.getImageScaledToCanvas().toDataURL("image/jpeg", 0.92);
      console.log("canvas2", canvas2);
      const options = {
        init(img) {
          img.crossOrigin = "anonymous";
        },
        type: "image/jpeg",
      };

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
      const canvas3 = imageData;

      watermark([canvas3, water], options)
        .image(watermark.image.lowerRight(1))
        .then((img) => {
          document.getElementById("alpha-image").appendChild(img);
        });
    }
  };

  return (
    <div>
      <h1 className='title'>Test Crop</h1>

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
      <button onClick={onClickSave}>ss</button>
    </div>
  );
};

export default ImageCrop;
