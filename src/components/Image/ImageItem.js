import React from "react";
import "./ImageItem.css";

const ImageItem = props => {
  return (
    <div className="imageItem">
      <img src={props.src} alt={props.alt} />
      <div className="utilities">
        <button><i class="fas fa-heart"></i></button>
        <button><i class="fas fa-plus"></i></button>
        <button><i class="fas fa-long-arrow-alt-down"></i></button>
      </div>
    </div>
  );
};

export default ImageItem;
