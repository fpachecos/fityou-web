import React from "react";
import { Row } from "react-bootstrap";
import PersonCard from "./PersonCard";

const PeopleList = (props) => {
  const removeHandle = (id) => {
    props.onRemove(id);
  };

  const chargeHandle = (id) => {
    props.onChargeRequest(id);
  };

  return (
    <Row xs={1} md={3}>
      {props.people.map((person) => (
        <PersonCard
          person={person}
          onRemove={(id) => removeHandle(id)}
          onChargeRequest={(id) => chargeHandle(id)}
          key={person.id}
        />
      ))}
    </Row>
  );
};

export default PeopleList;
