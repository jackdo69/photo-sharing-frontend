import React from "react";

import Masonry from "react-masonry-css";
import ImageItem from "./ImageItem";
import "./ImageList.css";

const DUMMY_IMAGES = [
  {
    name: "Big Ben",
    url: "img/pic1.jpg",
    id: 1
  },
  {
    name: "Opera House",
    url: "img/pic2.jpg",
    id: 2
  },
  {
    name: "Oxford University",
    url: "img/pic3.jpg",
    id: 3
  },
  {
    name: "The Ground of Alexandria",
    url: "img/pic4.jpg",
    id: 4
  },
  {
    name: "The Ground of Alexandria",
    url: "img/pic5.jpg",
    id: 5
  },
  {
    name: "The Ground of Alexandria",
    url: "img/pic6.jpg",
    id: 6
  }
];

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const imageGrid = DUMMY_IMAGES.map(img => {
  return <ImageItem src={img.url} alt={img.name} key={img.id} />;
});

const ImageList = () => {
  return (
    <div className="imageList">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imageGrid}
      </Masonry>
    </div>
  );
};

export default ImageList;
