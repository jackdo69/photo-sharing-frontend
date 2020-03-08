import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import PhotoItem from "../../components/Photo/PhotoItem";
import ErrorModal from "../../components/Modal/ErrorModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../hooks/http-hook";
import { useParams } from "react-router-dom";

//Masonry setup
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  800: 2,
  500: 1
};

const Search = () => {
  const params = useParams();
  const query = params.query;
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
  let filtered;
  let message;

  if (loadedPhotos) {
    filtered = loadedPhotos.filter(photo => {
      if (
        photo.description.toLowerCase().includes(query) ||
        photo.name.toLowerCase().includes(query)
      ) {
        return photo;
      }
      return null;
    });
    if (filtered.length > 0) {
      photosGrid = filtered.map(photo => {
        return (
          <PhotoItem
            src={`http://localhost:5000/${photo.image}`}
            alt={photo.name}
            key={photo.id}
            creator={photo.creator}
            description={photo.description}
            name={photo.name}
            likedBy={photo.likedBy}
          />
        );
      });
    } else {
      message = (
        <h3 className="center">Could not find photo, please try again!</h3>
      );
    }
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photosGrid}
        </Masonry>
      )}
      {message}
    </React.Fragment>
  );
};

export default Search;
