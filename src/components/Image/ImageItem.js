import React, { useState } from "react";
import "./ImageItem.css";

import Modal from "../Modal/Modal";
import ImageDetails from "./ImageDetails";

const ImageItem = props => {
  const [showDetails, setShowDetails] = useState(false);
  const openShowDetailsHandler = () => setShowDetails(true);
  const closeShowDetailsHandler = () => setShowDetails(false);

  return (
    <React.Fragment>
      <Modal
        show={showDetails}
        onCancel={closeShowDetailsHandler}
        header={props.author}
      >
        <ImageDetails
          src={props.src}
          name={props.name}
          description={props.description}
        />
      </Modal>

      <div onClick={openShowDetailsHandler} className="imageItem">
        <img src={props.src} alt={props.alt} />
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
      </div>
    </React.Fragment>
  );
};

export default ImageItem;
