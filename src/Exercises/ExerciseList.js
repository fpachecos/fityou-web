import React from "react";
import { Row } from "react-bootstrap";
import ExerciseCard from "./ExerciseCard";

const ExerciseList = (props) => {
  const removeHandle = (id) => {
    props.onRemove(id);
  };

  return (
    <Row xs={1} md={3}>
      {props.exercises.map((exercise) => (
        <ExerciseCard
          exercise={exercise}
          onRemove={(id) => removeHandle(id)}
          key={exercise.id}
        />
      ))}
    </Row>
  );
};

export default ExerciseList;
