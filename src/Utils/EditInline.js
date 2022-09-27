import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import editimg from "../img/edit.png";

const EditInline = (props) => {
  const text = useRef();
  const [textValue, setText] = useState(props.text);
  const [isEdit, setIsEdit] = useState(false);
  const [validated, setValidated] = useState(false);

  const onChange = (event) => {
    setText((prev) => {
      return event.target.value;
    });
  };

  const onEditHandle = () => {
    setIsEdit(true);
  };

  const edit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.onEdit({
        id: props.id,
        text: textValue,
      });
      setValidated(false);
      setIsEdit(false);
    }
  };

  let labelOrInput = (
    <p>
      {props.text} &nbsp;
      <img src={editimg} width={"24px"} alt="edit" onClick={onEditHandle}></img>
    </p>
  );

  if (isEdit) {
    labelOrInput = (
      <Form noValidate validated={validated} onSubmit={edit}>
        <Form.Group className="mb-12">
          <Form.Control
            type="text"
            id="text"
            ref={text}
            defaultValue={props.text}
            onChange={onChange}
            style={{
              width: "80%",
              float: "left",
              marginRight: "5px",
              marginBottom: "5px",
            }}
            required
          />
          <Button style={{ float: "left" }} type="submit">
            OK
          </Button>
        </Form.Group>
      </Form>
    );
  }

  return labelOrInput;
};

export default EditInline;
