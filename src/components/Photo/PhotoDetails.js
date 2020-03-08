import React from 'react';

import './PhotoDetails.css';

const PhotoDetails = (props) => {
    return <div className="imageDetails">
        <div className="imageLargeSize">
            <img src={props.src} alt={props.name} />
        </div>
        <div className="imageDescription">
            <p>{props.description}</p>
        </div>
    </div>;
}
 
export default PhotoDetails;