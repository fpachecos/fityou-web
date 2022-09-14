import React from "react";
import youtubeimg from "../img/youtube.png";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const WorkoutExerciseList = (props) => {
  const removeHandler = (id) => {
    return props.onRemove(id);
  };

  return (
    <Row xs={1} md={1}>
      {props.workoutExercises.map((workoutExercise) => {
        return (
          <Col key={workoutExercise.id}>
            <Card style={{ marginTop: "5px" }}>
              <Container>
                <Row style={{ textAlign: "left" }}>
                  <Col xs="12">
                    <b>{workoutExercise.name}</b> &nbsp;
                    <a
                      href={workoutExercise.videoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src={youtubeimg} width="20px" />
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4" md="3">
                    <small>Repetições</small>
                  </Col>
                  <Col xs="8" md="3">
                    <input type="number" min="0" style={{ width: "100%" }} />
                  </Col>
                  <Col xs="4" md="3">
                    <small>Series</small>
                  </Col>
                  <Col xs="8" md="3">
                    <input type="number" min="0" style={{ width: "100%" }} />
                  </Col>
                </Row>
                <Row>&nbsp;</Row>
                <Row>
                  <Col xs="4" md="3">
                    <small>Comentários</small>
                  </Col>
                  <Col xs="8" md="9">
                    <textarea style={{ width: "100%" }} />
                  </Col>
                  <Col xs="12" md="1" style={{ textAlign: "right" }}></Col>
                </Row>
                <Row>
                  <Col>
                    <div className="d-grid gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => removeHandler(workoutExercise.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row>&nbsp;</Row>
              </Container>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default WorkoutExerciseList;
