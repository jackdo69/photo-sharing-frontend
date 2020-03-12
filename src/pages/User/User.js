import React, { useContext, useEffect, useState } from "react";

import "./User.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/Modal/ErrorModal";
import Button from "../../components/Button/Button";
import PhotoItem from "../../components/Photo/PhotoItem";
import Backdrop from "../../components/Backdrop/Backdrop";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Tabs from "./Tabs";
import Panel from "./Panel";
import AddPhoto from "../../components/Photo/AddPhoto";
import Masonry from "react-masonry-css";

//Masonry setup
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  800: 2,
  500: 1
};

const User = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [loadedUser, setLoadedUser] = useState();
  const [uploadedPhotos, setUploadedPhotos] = useState();
  const [likedPhotos, setLikedPhotos] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //Runs after everytime User component render or updates
  //the 'sendRequest' and 'userId'
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
        );
        setLoadedUser(res.user);
      } catch (err) {}
    };

    const fetchUploadedPhotos = async () => {
      try {
        let res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/photos/user/${userId}`
        );

        setUploadedPhotos(res.photos);
      } catch (err) {}
    };

    const fetchLikedPhotos = async () => {
      try {
        let res = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/photos/user/like/${userId}`
        );
          
        setLikedPhotos(res.photos);
      } catch (err) {}
    };

    if (userId) {
      fetchUser();
      fetchUploadedPhotos();
      fetchLikedPhotos();
      
    }
  }, [sendRequest, userId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  let uploadedPhotosGrid;
  if (uploadedPhotos) {
    uploadedPhotosGrid = uploadedPhotos.map(photo => {
      return (
        <React.Fragment key={photo.id}>
          <PhotoItem
            src={`${photo.image}`}
            alt={photo.name}
            creator={photo.creator}
            description={photo.description}
            name={photo.name}
            id={photo.id}
            likedBy={photo.likedBy}
          />
        </React.Fragment>
      );
    });
  }

  let likedPhotosGrid;
  if (likedPhotos) {
    likedPhotosGrid = likedPhotos.map(photo => {
      return (
        <React.Fragment key={photo.id}>
          <PhotoItem
            src={`${process.env.REACT_APP_BACKEND_URL}/${photo.image}`}
            alt={photo.name}
            creator={photo.creator}
            description={photo.description}
            name={photo.name}
            id={photo.id}
            likedBy={photo.likedBy}
          />
        </React.Fragment>
      );
    });
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {showAdd && <Backdrop onClick={() => setShowAdd(false)} />}

      <AddPhoto showAdd={showAdd} onClear={() => setShowAdd(false)} />

      <div className="userPage">
        {!isLoading && loadedUser && (
          <div className="userPanel">
            <div className="profile">
              <img
                src={`${loadedUser.image}`}
                alt="Profile"
              />
            </div>
            <div className="userInfo">
              <p>@{loadedUser.name}</p>

              <span className="introduction">{loadedUser.introduction}</span>
            </div>
            <div className="addPhoto">
              <Button onClick={() => setShowAdd(true)}>Add Photo</Button>
            </div>
          </div>
        )}
        <hr />
        <Tabs selected={0}>
          <Panel title="Uploaded">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {uploadedPhotosGrid}
            </Masonry>
          </Panel>
          <Panel title="Liked">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {likedPhotosGrid}
            </Masonry>
          </Panel>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default User;
