import React, { useState, useContext } from "react";
import "./ImageItem.css";

import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";
import ImageDetails from "./ImageDetails";
import EditPhoto from "./EditPhoto";
import { AuthContext } from "../../context/auth-context";

const ImageItem = props => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const openShowDetailsHandler = event => {
    setShowDetails(true);
    event.stopPropagation();
  };
  let controls;
  if (auth.userId === props.creator && params.userId) {
    controls = (
      <div className="controls">
        <button onClick={() => setShowEdit(true)}>
          <i className="fas fa-edit"></i>
        </button>
        <button>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    );
  } else {
    controls = (
      <div className="utilities">
        <button>
          <i className="fas fa-heart"></i>
        </button>
        <button>
          <i className="fas fa-plus"></i>
        </button>
        <button>
          <i className="fas fa-long-arrow-alt-down"></i>
        </button>
      </div>
    );
  }

  return (
    <React.Fragment>
      {showDetails && <Backdrop onClick={() => setShowDetails(false)} />}
      {showEdit && <Backdrop onClick={() => setShowEdit(false)} />}
      <EditPhoto
        name={props.name}
        description={props.description}
        showEdit={showEdit}
        onClear={() => setShowEdit(false)}
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

export default ImageItem;
