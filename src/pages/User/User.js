import React, { useContext, useEffect, useState } from "react";

import "./User.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/Modal/ErrorModal";
import Button from "../../components/Button/Button";
import ImageItem from "../../components/Image/ImageItem";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Tabs from "./Tabs";
import Panel from "./Panel";
import AddPhoto from "./AddPhoto";
import EditPhoto from "./EditPhoto";
import Masonry from "react-masonry-css";

//Masonry setup
const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const User = () => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [loadedUser, setLoadedUser] = useState();
  const [uploadedPhotos, setUploadedPhotos] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //Runs after everytime User component render or updates
  //the 'sendRequest' and 'userId'
  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setLoadedUser(res.user);
      } catch (err) {}
    };

    const fetchUploadedPhotos = async () => {
      try {
        let res = await sendRequest(
          `http://localhost:5000/api/photos/user/${userId}`
        );

        setUploadedPhotos(res.photos);
      } catch (err) {}
    };

    if (userId) {
      fetchUser();
      fetchUploadedPhotos();
    }
  }, [sendRequest, userId]);

  let photoEdit;
  const showEditHandler = id => {
    photoEdit = uploadedPhotos.filter(e => e.id === id);
    console.log(photoEdit);
    setShowEdit(true);
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  let photosGrid;
  if (uploadedPhotos) {
    photosGrid = uploadedPhotos.map(photo => {
      return (
        <React.Fragment
        
        key={photo.id}>
          <ImageItem
            showEdit={() => showEditHandler(photo.id)}
            src={`http://localhost:5000/${photo.image}`}
            alt={photo.name}
            creator={photo.creator}
            description={photo.description}
            name={photo.name}
          />
          <EditPhoto
            photoName={photo.name}
            photoDescription={photo.description}
            showEdit={showEdit}
            onClear={() => setShowEdit(false)}
          />
        </React.Fragment>
      );
    });
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <AddPhoto showAdd={showAdd} onClear={() => setShowAdd(false)} />

      <div className="userPage">
        {!isLoading && loadedUser && (
          <div className="userPanel">
            <div className="profile">
              <img
                src={`http://localhost:5000/${loadedUser.image}`}
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
              {photosGrid}
            </Masonry>
          </Panel>
          <Panel title="Collection">This is the second panel</Panel>
          <Panel title="Liked">This is the third panel</Panel>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default User;
