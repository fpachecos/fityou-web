import { Container, Row, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import ExerciseList from "./ExerciseList";
import NewExerciseModal from "./NewExerciseModal";

function Exercise() {
  const [exercises, setExercises] = useState([]);
  const [newExerciseVisible, setNewExerciseVisible] = useState(false);

  const fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EXERCISES)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setExercises(data);
      });
  };

  const remove = async (id) => {
    if (
      window.confirm(
        "Remover o exercício da lista vai remove-lo de todos os treinos também. Quer continuar?"
      )
    ) {
      fetch(
        process.env.REACT_APP_API_URL +
          process.env.REACT_APP_EXERCISES +
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

  const handleShow = () => setNewExerciseVisible(true);

  const newExerciseHideHandler = () => setNewExerciseVisible(false);

  const newExerciseOnAddHandler = (newExercise) => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_EXERCISES, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExercise),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          fetchData();
          setNewExerciseVisible(false);
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
      <Row>
        <div className="d-grid gap-2">
          <Button variant="primary" size="sm" onClick={handleShow}>
            Adicionar
          </Button>
        </div>
        <NewExerciseModal
          visible={newExerciseVisible}
          onHide={newExerciseHideHandler}
          onAdd={newExerciseOnAddHandler}
        />
      </Row>
      <Row>&nbsp;</Row>
      <ExerciseList exercises={exercises} onRemove={remove} />
    </Container>
  );
}

export default Exercise;
