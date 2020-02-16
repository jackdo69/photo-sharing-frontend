import React from "react";
import "./ImageItem.css";

const ImageItem = props => {
  return (
    <div className="imageItem">
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default ImageItem;
