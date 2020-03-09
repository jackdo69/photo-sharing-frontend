import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import PhotoItem from "../../components/Photo/PhotoItem";
import ErrorModal from "../../components/Modal/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import "./FrontPage.css";

//Masonry setup
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  800: 2,
  500: 1
};

const FrontPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPhotos, setLoadedPhotos] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/api/photos");
        setLoadedPhotos(res.photos);
      } catch (err) {}
    };
    fetchPhotos();
  }, [sendRequest]);

  let photosGrid;
  if (loadedPhotos) {
    photosGrid = loadedPhotos.map(photo => {
      return (
        <PhotoItem
          src={`${process.env.REACT_APP_BACKEND_URL}/${photo.image}`}
          alt={photo.name}
          key={photo.id}
          id={photo.id}
          creator={photo.creator}
          description={photo.description}
          name={photo.name}
          likedBy={photo.likedBy}
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

export default FrontPage;
