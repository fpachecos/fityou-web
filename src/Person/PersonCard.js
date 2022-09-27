import React from "react";
import { Button, Card, Col } from "react-bootstrap";

const PersonCard = (props) => {
  const removeHandle = (id) => {
    props.onRemove(id);
  };

  return (
    <Col key={props.person.id}>
      <Card>
        <Card.Body>
          <Card.Title>{props.person.name}</Card.Title>
          <Card.Text>Contato: {props.person.phoneNumber}</Card.Text>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={(event) => removeHandle(props.person.id)}
            >
              Excluir
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PersonCard;
