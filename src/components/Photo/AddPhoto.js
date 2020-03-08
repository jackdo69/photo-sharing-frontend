import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import ImageUpload from "../ImageUpload/ImageUpload";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorModal from "../Modal/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../Validator/validator";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

const AddPhoto = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );
  const photoSubmitHandler = async event => {
    // event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      const res = await sendRequest(
        "http://localhost:5000/api/photos",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token
        }
      );
      //Redirect the user to a different page
    //   history.push("/user")
      console.log(res);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        onSubmit={photoSubmitHandler}
        onCancel={props.onClear}
        header="Add a photo"
        show={props.showAdd}
        footer={
          <Button type="button" onClick={props.onClear}>
            CANCEL
          </Button>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PHOTO
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default AddPhoto;
