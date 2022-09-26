import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NewWorkout from "./NewWorkout";

import EditInline from "../Utils/EditInline";

const WorkoutList = (props) => {
  const [workoutList, setWorkoutList] = useState([]);
  const [newWorkoutVisible, setNewWorkoutVisible] = useState(false);

  const fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_WORKOUTS)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWorkoutList(data);
      });
  };

  const handleShow = () => {
    setNewWorkoutVisible(true);
  };

  const newWorkoutHideHandler = () => setNewWorkoutVisible(false);

  const newWorkoutOnAddHandler = (newWorkout) => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_WORKOUTS, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          fetchData();
          setNewWorkoutVisible(false);
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  const removeHandle = (id) => {
    if (
      window.confirm("Você está prestes a remover o treino. Quer continuar?")
    ) {
      fetch(
        process.env.REACT_APP_API_URL +
          process.env.REACT_APP_WORKOUTS +
          "/" +
          id,
        { method: "DELETE" }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccess) {
            if (!alert(data.message)) {
              fetchData();
            }
          } else {
            alert(data.message);
            console.log(data.technicalMessage);
          }
        });
    }
  };

  const toExercises = (id) => {
    window.location.href = "/workoutcreation/" + id;
  };

  const onEditHandle = (newNameObj, id) => {
    fetch(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_WORKOUTS + "/" + id,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newNameObj.text }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          setWorkoutList((prevValue) => {
            let i = 0;
            while (i < prevValue.length) {
              if (prevValue[i].id === id) {
                prevValue[i].name = newNameObj.text;
              }
              i++;
            }
            return [...prevValue];
          });
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Row className="pageTitle">
        <h2>Treinos</h2>
      </Row>

      <Row>
        <Col className="d-grid gap-2">
          <Button variant="primary" size="sm" onClick={handleShow}>
            Adicionar
          </Button>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row xs={1} md={3}>
        {workoutList.map((workout) => {
          return (
            <Col key={workout.id} style={{ marginTop: "5px" }}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <EditInline
                      text={workout.name}
                      onEdit={onEditHandle}
                      id={workout.id}
                    />
                  </Card.Title>
                  <Card.Footer style={{ textAlign: "right" }}>
                    <Button
                      variant="secondary"
                      onClick={(event) => removeHandle(workout.id)}
                    >
                      Remover
                    </Button>
                    &nbsp;
                    <Button onClick={(event) => toExercises(workout.id)}>
                      Exercicios
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <NewWorkout
        visible={newWorkoutVisible}
        onHide={newWorkoutHideHandler}
        onAdd={newWorkoutOnAddHandler}
      />
    </Container>
  );
};

export default WorkoutList;
