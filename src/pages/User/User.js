import React, { useContext, useEffect, useState } from "react";

import "./User.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../components/Modal/ErrorModal";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import ImageItem from "../../components/Image/ImageItem";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Tabs from "./Tabs";
import Panel from "./Panel";
import AddEditPhoto from "./AddEditPhoto";
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
  const [showAddEdit, setShowAddEdit] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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
          `http://localhost:5000/api/photos/${userId}`
        );
        console.log(res);

        setUploadedPhotos(res.photos);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      fetchUser();
      fetchUploadedPhotos();
    }
  }, [sendRequest, userId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find user!</h2>
        </Card>
      </div>
    );
  }

  let photosGrid;
  if (uploadedPhotos) {
    photosGrid = uploadedPhotos.map(photo => {
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
      <AddEditPhoto
        showAddEdit={showAddEdit}
        onClear={() => setShowAddEdit(false)}
      />
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
              <Button onClick={() => setShowAddEdit(true)}>Add Photo</Button>
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
