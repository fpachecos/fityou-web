import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const NewExerciseModal = (props) => {
  const [newExerciseNameValue, setNewExerciseNameValue] = useState("");
  const [newExerciseVideoLinkValue, setNewExerciseVideoLinkValue] =
    useState("");
  const newExerciseName = useRef(null);
  const newExerciseVideoLink = useRef(null);

  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setNewExerciseNameValue("");
    setNewExerciseVideoLinkValue("");
    props.onHide();
  };

  const onChange = (e) => {
    if (e.target.id === "newExerciseName")
      setNewExerciseNameValue(e.target.value);
    if (e.target.id === "newExerciseVideoLink")
      setNewExerciseVideoLinkValue(e.target.value);
  };

  const add = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.onAdd({
        name: newExerciseName.current.value,
        videoLink: newExerciseVideoLink.current.value,
      });
      setNewExerciseNameValue("");
      setNewExerciseVideoLinkValue("");
      setValidated(false);
    }
  };

  return (
    <Modal show={props.visible} onHide={handleClose} style={{ width: "90%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Exercício</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={add}>
          <Form.Group className="mb-12">
            <Form.Label htmlFor="newExerciseName">Nome do Exercício</Form.Label>
            <Form.Control
              type="text"
              id="newExerciseName"
              ref={newExerciseName}
              value={newExerciseNameValue}
              onChange={onChange}
              placeholder="Ex: Supino Reto"
              required
            />
            <Form.Control.Feedback>Aqui está tudo bem!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Falta você colocar o nome do exercício.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-12">
            <Form.Label htmlFor="newExerciseVideoLink">
              Link para o vídeo
            </Form.Label>
            <Form.Control
              type="text"
              id="newExerciseVideoLink"
              ref={newExerciseVideoLink}
              value={newExerciseVideoLinkValue}
              onChange={onChange}
              placeholder="Ex: https://www.youtube.com/embed/234ewrwr3"
            />
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

export default NewExerciseModal;
