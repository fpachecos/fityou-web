import React, { useEffect, useState } from "react";

import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useParams } from "react-router-dom";
import EditInline from "../Utils/EditInline";
import WorkoutExerciseList from "./WorkoutExerciseList";

const WorkoutCreation = () => {
  const [exercises, setExercises] = useState([]);
  const [workoutExerciseList, setWorkoutExerciseList] = useState([]);
  const [displayAlreadyHaveMsg, setDisplayAlreadyHaveMsg] = useState("none");
  const [selectedWorkout, setSelectedWorkout] = useState({});
  const { id } = useParams();

  const fetchData = () => {
    fetch(
      process.env.REACT_APP_API_URL + process.env.REACT_APP_WORKOUTS + "/" + id
    )
      .then((response) => {
        return response.json();
      })
      .then((workout) => {
        let tempWorkoutItems = [];

        workout.workoutItems.forEach((workoutItem) => {
          if (
            tempWorkoutItems.length === 0 ||
            tempWorkoutItems.filter((item) => {
              return item.id === workoutItem.exercise.id;
            }).length === 0
          )
            tempWorkoutItems.push({
              id: workoutItem.id,
              exerciseId: workoutItem.exercise.id,
              name: workoutItem.exercise.name,
              repetitions: workoutItem.repetitions,
              series: workoutItem.series,
              comments: workoutItem.comments,
            });
        });
        setSelectedWorkout(workout);
        setWorkoutExerciseList(tempWorkoutItems);
      });

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

    if (selected.length > 0) {
      workoutExerciseList.forEach((workoutExercise) => {
        if (workoutExercise.exerciseId === selected[0].id) {
          exists = true;
          setDisplayAlreadyHaveMsg("inline");
          setTimeout(() => {
            setDisplayAlreadyHaveMsg("none");
          }, 3000);
        }
      });

      if (!exists) {
        setWorkoutExerciseList((previousValue) => {
          return [
            ...previousValue,
            { ...selected[0], id: null, exerciseId: selected[0].id },
          ];
        });
      }
    }
  };

  const removeExerciseFromWorkout = (id) => {
    setWorkoutExerciseList((previousValue) => {
      return previousValue.filter((value) => {
        return value.exerciseId !== id;
      });
    });
  };

  const onEditHandle = (newNameObj, idWorkout) => {
    if (!newNameObj.text) return;

    fetch(
      process.env.REACT_APP_API_URL +
        process.env.REACT_APP_WORKOUTS +
        "/" +
        idWorkout,
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
          setSelectedWorkout((prevValue) => {
            return { ...prevValue, name: newNameObj.text };
          });
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  const onEditRestTimeHandle = (newRestTimeObj, idWorkout) => {
    if (!newRestTimeObj.text) return;

    fetch(
      process.env.REACT_APP_API_URL +
        process.env.REACT_APP_WORKOUTS +
        "/" +
        idWorkout,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ restTime: newRestTimeObj.text }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          setSelectedWorkout((prevValue) => {
            return { ...prevValue, restTime: newRestTimeObj.text };
          });
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  const onSaveHandler = () => {
    fetch(process.env.REACT_APP_API_URL + "workoutCreation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...selectedWorkout,
        items: workoutExerciseList,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          alert("Treino atualizado com sucesso!");
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  const onRepetitionChangeHandler = (id, newRepetitions) => {
    setWorkoutExerciseList((prev) => {
      let changedExercise = prev.find((element) => {
        return element.exerciseId == id;
      });
      const changedExerciseIndex = prev.findIndex((element) => {
        return element.exerciseId == id;
      });

      changedExercise = { ...changedExercise, repetitions: newRepetitions };

      prev[changedExerciseIndex] = changedExercise;

      return prev;
    });
  };

  const onSeriesChangeHandler = (id, newSeries) => {
    setWorkoutExerciseList((prev) => {
      let changedExercise = prev.find((element) => {
        return element.exerciseId == id;
      });
      const changedExerciseIndex = prev.findIndex((element) => {
        return element.exerciseId == id;
      });

      changedExercise = { ...changedExercise, series: newSeries };

      prev[changedExerciseIndex] = changedExercise;

      return prev;
    });
  };

  const onCommentsChangeHandler = (id, newComments) => {
    setWorkoutExerciseList((prev) => {
      let changedExercise = prev.find((element) => {
        return element.exerciseId == id;
      });
      const changedExerciseIndex = prev.findIndex((element) => {
        return element.exerciseId == id;
      });

      changedExercise = { ...changedExercise, comments: newComments };

      prev[changedExerciseIndex] = changedExercise;

      return prev;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="12" md="6">
          <h2>
            <EditInline
              text={selectedWorkout.name}
              onEdit={onEditHandle}
              id={selectedWorkout.id}
            />
          </h2>
        </Col>
        <Col>
          <i>Tempo de Descanso</i>
          <EditInline
            text={
              selectedWorkout.restTime === null
                ? "Definir ..."
                : selectedWorkout.restTime
            }
            onEdit={onEditRestTimeHandle}
            id={selectedWorkout.id}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Typeahead
            id="exercises"
            selected={[]}
            labelKey="name"
            onChange={onChangeExercise}
            options={exercises}
            placeholder="Escolha o exercício para incluir ..."
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
        onRepetitionChange={onRepetitionChangeHandler}
        onSeriesChange={onSeriesChangeHandler}
        onCommentsChange={onCommentsChangeHandler}
      />
      <Row>
        <Col className="d-grid gap-2">
          <br />
          <Button onClick={onSaveHandler}>Salvar</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkoutCreation;
