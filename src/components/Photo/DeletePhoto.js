import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ErrorModal from "../Modal/ErrorModal";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";

const DeletePhoto = props => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const confirmDeleteHandler = async () => {
    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/photos/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token
        }
      );
      console.log(res);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        onSubmit={confirmDeleteHandler}
        show={props.showDelete}
        onCancel={props.onClear}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button type="button" onClick={props.onClear}>
              CANCEL
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this photo? Please note that it
          can't be undone
        </p>
        <Button type="submit" danger>
          DELETE
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default DeletePhoto;
