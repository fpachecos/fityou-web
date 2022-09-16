import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const NewWorkout = (props) => {
  const [newWorkoutNameValue, setNewWorkoutNameValue] = useState("");
  const newWorkoutName = useRef(null);
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setNewWorkoutNameValue("");
    props.onHide();
  };

  const onChange = (e) => {
    if (e.target.id === "newWorkoutName")
      setNewWorkoutNameValue(e.target.value);
  };

  const add = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.onAdd({
        name: newWorkoutName.current.value,
      });
      setNewWorkoutNameValue("");
      setValidated(false);
    }
  };

  return (
    <Modal show={props.visible} onHide={handleClose} style={{ width: "90%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Treino</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={add}>
          <Form.Group className="mb-12">
            <Form.Label htmlFor="newWorkoutName">Nome do Exercício</Form.Label>
            <Form.Control
              type="text"
              id="newWorkoutName"
              ref={newWorkoutName}
              value={newWorkoutNameValue}
              onChange={onChange}
              placeholder="Ex: Treino de Hipertrofia do Filipe"
              required
            />
            <Form.Control.Feedback>Aqui está tudo bem!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Falta você colocar o nome do treino.
            </Form.Control.Feedback>
          </Form.Group>
          &nbsp;
          <Form.Group style={{ textAlign: "right" }} className="mb-12">
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            &nbsp;
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default NewWorkout;
