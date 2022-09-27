import React, { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const NewPersonModal = (props) => {
  const [newPersonNameValue, setNewPersonNameValue] = useState("");
  const [newPhoneNumberValue, setNewPhoneNumberValue] = useState("");
  const newPersonName = useRef(null);
  const newPhoneNumber = useRef(null);

  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setNewPersonNameValue("");
    setNewPhoneNumberValue("");
    props.onHide();
  };

  const onChange = (e) => {
    if (e.target.id === "newPersonName") setNewPersonNameValue(e.target.value);
    if (e.target.id === "newPhoneNumber")
      setNewPhoneNumberValue(e.target.value);
  };

  const add = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    setValidated(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      props.onAdd({
        name: newPersonName.current.value,
        phoneNumber: newPhoneNumber.current.value,
        acceptRecieveMessages: true,
      });
      setNewPersonNameValue("");
      setNewPhoneNumberValue("");
      setValidated(false);
    }
  };

  return (
    <Modal show={props.visible} onHide={handleClose} style={{ width: "90%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Novo Aluno/a</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={add}>
          <Form.Group className="mb-12">
            <Form.Label htmlFor="newPersonName">Nome Completo</Form.Label>
            <Form.Control
              type="text"
              id="newPersonName"
              ref={newPersonName}
              value={newPersonNameValue}
              onChange={onChange}
              required
            />
            <Form.Control.Feedback>Aqui está tudo bem!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Falta você colocar o nome completo do aluno/a
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-12">
            <Form.Label htmlFor="newPhoneNumber">Telefone</Form.Label>
            <Form.Control
              type="tel"
              id="newPhoneNumber"
              ref={newPhoneNumber}
              value={newPhoneNumberValue}
              onChange={onChange}
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

export default NewPersonModal;
