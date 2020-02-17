import React from "react";

import Masonry from "react-masonry-css";
import ImageItem from "./ImageItem";
import "./ImageList.css";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

let imageList = [];
for (let i = 1; i <= 9; i++) {
  imageList.push({
    name: `pic ${i}`,
    url: `img/pic${i}.jpg`,
    id: i
  });
}

const imageGrid = imageList.map(img => {
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
