import React, { useState, useContext } from "react";
import "./ImageItem.css";

import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import ImageDetails from "./ImageDetails";
import { AuthContext } from "../../context/auth-context";

const ImageItem = props => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const openShowDetailsHandler = event => {
    setShowDetails(true);
    event.stopPropagation();
  };
  const closeShowDetailsHandler = () => setShowDetails(false);
  

  let controls;
  if (auth.userId === props.creator && params.userId) {
    controls = (
      <div className="controls">
        <button onClick={props.showEdit}>
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
      <Modal
        show={showDetails}
        onCancel={closeShowDetailsHandler}
        header={props.name}
      >
        <ImageDetails
          src={props.src}
          name={props.name}
          description={props.description}
        />
      </Modal>

      <div  className="imageItem">
        <img src={props.src} alt={props.alt} onClick={(e) => openShowDetailsHandler(e)}/>
        
        {controls}
      </div>
    </React.Fragment>
  );
};

export default ImageItem;
