import React from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ErrorModal from "../Modal/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../Validator/validator";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";

const EditPhoto = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: props.name,
        isValid: true
      },
      description: {
        value: props.description,
        isValid: true
      }
    },
    true
  );
  const photoSubmitHandler = async event => {
    // event.preventDefault();
    console.log(props);
    
    try {
      const res = await sendRequest(
        `http://localhost:5000/api/photos/${props.id}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          creator: props.creator
        }),
        {
          "Content-Type": "application/json"
        }
      );
      console.log(res);
      
    } catch (err) {}
  };
  

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        onSubmit={photoSubmitHandler}
        onCancel={props.onClear}
        header="Edit details"
        show={props.showEdit}
        footer={
          <Button type="button" onClick={props.onClear}>
            CANCEL
          </Button>
        }
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          initialValue={formState.inputs.name.value}
          id="name"
          element="input"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        <Input
          initialValue={formState.inputs.description.value}
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          SUBMIT
        </Button>
      </Modal>
    </React.Fragment>
  );
};

export default EditPhoto;
