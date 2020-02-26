import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import ImageItem from "../../components/Image/ImageItem";
import ErrorModal from "../../components/Modal/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import "./ImageList.css";

//Masonry setup
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const ImageList = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPhotos, setLoadedPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await sendRequest("http://localhost:5000/api/photos");
        setLoadedPhotos(res.photos);
        
      } catch (err) {}
    };
    fetchPhotos();
  }, [sendRequest]);
  let photosGrid;
  if (loadedPhotos) {
    photosGrid = loadedPhotos.map(photo => {
      return (
        <ImageItem
          src={`http://localhost:5000/${photo.image}`}
          alt={photo.name}
          key={photo.id}
          author={photo.creator}
          description={photo.description}
          name={photo.name}
        />
      );
    });
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPhotos && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photosGrid}
        </Masonry>
      )}
    </React.Fragment>
  );
};

export default ImageList;
