import React, { useState, useContext, useEffect } from "react";
import "./PhotoItem.css";

import { useParams, useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorModal from "../Modal/ErrorModal";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import ImageDetails from "./PhotoDetails";
import EditPhoto from "./EditPhoto";
import DeletePhoto from "./DeletePhoto";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

const PhotoItem = props => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [liked, setLiked] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const openShowDetailsHandler = event => {
    setShowDetails(true);
    event.stopPropagation();
  };

  useEffect(() => {
    if (props.likedBy.includes(auth.userId)) {
      setLiked("like");
    }
  }, [props.likedBy, auth.userId]);

  const likePhoto = async event => {
    if (!auth.token) {
      history.push("/auth");
    } else {
      try {
        // event.preventDefault();
        const res = await sendRequest(
          "http://localhost:5000/api/photos/user/like",
          "PATCH",
          JSON.stringify({
            photoId: props.id,
            userId: auth.userId
          }),
          {
            "Content-Type": "application/json"
          }
        );
        setLiked("like");
        console.log(res);
      } catch (err) {}
    }
  };
  let controls;
  if (auth.userId === props.creator && params.userId) {
    controls = (
      <div className="controls">
        <button onClick={() => setShowEdit(true)}>
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => setShowDelete(true)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  } else {
    controls = (
      <div className="utilities">
        <button className={liked} onClick={() => likePhoto()}>
          <i className="fas fa-heart"></i>
        </button>
        <button>
          <i className="fas fa-long-arrow-alt-down"></i>
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {showDetails && <Backdrop onClick={() => setShowDetails(false)} />}
      {showEdit && <Backdrop onClick={() => setShowEdit(false)} />}
      {showDelete && <Backdrop onClick={() => setShowDelete(false)} />}
      <EditPhoto
        name={props.name}
        description={props.description}
        showEdit={showEdit}
        onClear={() => setShowEdit(false)}
        id={props.id}
        creator={props.creator}
      />
      <DeletePhoto
        name={props.name}
        description={props.description}
        showDelete={showDelete}
        onClear={() => setShowDelete(false)}
        id={props.id}
        creator={props.creator}
      />
      <Modal
        show={showDetails}
        onCancel={() => setShowDetails(false)}
        header={props.name}
      >
        <ImageDetails
          src={props.src}
          name={props.name}
          description={props.description}
        />
      </Modal>

      <div className="imageItem">
        <img
          src={props.src}
          alt={props.alt}
          onClick={e => openShowDetailsHandler(e)}
        />

        {controls}
      </div>
    </React.Fragment>
  );
};

export default PhotoItem;
