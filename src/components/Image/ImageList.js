import React from "react";

import ImageItem from "./ImageItem";

const DUMMY_IMAGES = [
  {
    name: "Big Ben",
    url: "img/BigBenUK.jpg",
    id: 1
  },
  {
    name: "Opera House",
    url: "img/OperaHouse.jpg",
    id: 2
  },
  {
    name: "Oxford University",
    url: "img/OxfordUniversity.jpg",
    id: 3
  },
  {
    name: "The Ground of Alexandria",
    url: "img/TheGroundOfAlexandria.jpg",
    id: 4
  }
];

const ImageList = () => {
  return (
    <div className="imageList">
      {DUMMY_IMAGES.map(img => {
        return <ImageItem src={img.url} alt={img.name} key={img.id} />;
      })}
    </div>
  );
};

export default ImageList;
