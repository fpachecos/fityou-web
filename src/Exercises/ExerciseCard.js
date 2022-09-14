import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import YoutubeVideo from "../Utils/YoutubeVideo";

const ExerciseCard = (props) => {
  const removeHandle = (id) => {
    props.onRemove(id);
  };

  return (
    <Col key={props.exercise.id}>
      <Card>
        <Card.Body>
          <Card.Header style={{ backgroundColor: "transparent" }}>
            <YoutubeVideo
              id={props.exercise.id}
              videoLink={props.exercise.videoLink}
            />
          </Card.Header>
          <Card.Title style={{ textAlign: "center" }}>
            {props.exercise.name}
          </Card.Title>
          <div className="d-grid gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={(event) => removeHandle(props.exercise.id)}
            >
              Excluir
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ExerciseCard;
