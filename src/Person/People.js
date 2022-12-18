import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import NewPersonModal from "./NewPersonModal";
import PeopleList from "./PeopleList";

const People = (props) => {
  const [peopleList, setPeopleList] = useState([]);
  const [newPersonVisible, setNewPersonVisible] = useState(false);

  const fetchData = () => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_PEOPLE)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPeopleList(data);
      });
  };

  const removeHandle = (id) => {
    if (window.confirm("Deseja mesmo excluir esse/a Aluno/a da lista?")) {
      fetch(
        process.env.REACT_APP_API_URL + process.env.REACT_APP_PEOPLE + "/" + id,
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

  const handleShow = () => setNewPersonVisible(true);

  const newPersonHideHandler = () => setNewPersonVisible(false);

  const newPersonOnAddHandler = (newPerson) => {
    fetch(process.env.REACT_APP_API_URL + process.env.REACT_APP_PEOPLE, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          fetchData();
          setNewPersonVisible(false);
        } else {
          alert(data.message);
          console.log(data.technicalMessage);
        }
      });
  };

  const chargeRequestHandle = (id) => {
    var amount = window.prompt("Qual o valor?", "0,00");
    if (amount != null && amount != "" && amount != "0,00") {
      fetch(
        process.env.REACT_APP_API_URL +
          process.env.REACT_APP_PAYMENTS_INTENTION,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personId: id,
            grossAmount: amount,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.isSuccess) {
            window.location.href =
              process.env.REACT_APP_WEB_URL + "pagamento?id=" + data.id;
          } else {
            alert(data.message);
            console.log(data.technicalMessage);
          }
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container>
      <Row className="pageTitle">
        <h2>Alunos/as</h2>
      </Row>
      <Row>
        <div className="d-grid gap-2">
          <Button variant="primary" size="sm" onClick={handleShow}>
            Adicionar
          </Button>
        </div>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <PeopleList
          people={peopleList}
          onRemove={removeHandle}
          onChargeRequest={chargeRequestHandle}
        ></PeopleList>
      </Row>
      <NewPersonModal
        visible={newPersonVisible}
        onHide={newPersonHideHandler}
        onAdd={newPersonOnAddHandler}
      ></NewPersonModal>
    </Container>
  );
};

export default People;
