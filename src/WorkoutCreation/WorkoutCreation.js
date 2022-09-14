import React, { useEffect, useState } from "react";

import { Container, Row, Col, Alert } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import WorkoutExerciseList from "./WorkoutExerciseList";

function WorkoutCreation() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState([]);
  const [workoutExerciseList, setWorkoutExerciseList] = useState([]);
  const [displayAlreadyHaveMsg, setDisplayAlreadyHaveMsg] = useState("none");

  const fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EXERCISES)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      });
  };

  const onChangeExercise = (selected) => {
    var exists = false;
    setDisplayAlreadyHaveMsg("none");

    setSelectedExercise(selected);

    if (selected.length > 0) {
      workoutExerciseList.forEach((workoutExercise) => {
        if (workoutExercise.id === selected[0].id) {
          exists = true;
          setDisplayAlreadyHaveMsg("inline");
          setTimeout(() => {
            setDisplayAlreadyHaveMsg("none");
          }, 3000);
        }
      });

      if (!exists) {
        setWorkoutExerciseList((previousValue) => {
          return [...previousValue, selected[0]];
        });
      }
    }
  };

  const removeExerciseFromWorkout = (id) => {
    setWorkoutExerciseList((previousValue) => {
      return previousValue.filter((value) => {
        return value.id != id;
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <Typeahead
            id="exercises"
            labelKey="name"
            onChange={onChangeExercise}
            options={exercises}
            defaultSelected={selectedExercise}
            placeholder="Afundo ..."
          />
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Alert
          variant="warning"
          style={{ display: `${displayAlreadyHaveMsg}` }}
        >
          Você já tem esse exercício no seu treino.
        </Alert>
      </Row>
      <WorkoutExerciseList
        workoutExercises={workoutExerciseList}
        onRemove={removeExerciseFromWorkout}
      />
    </Container>
  );
}

export default WorkoutCreation;
