import React from "react";
import { Container } from "react-bootstrap";

const Pagamento = (props) => {
  return (
    <Container>
      <iframe
        title="newCard"
        src="/pagseguro/newCardRegister.html"
        style={{ width: "100%", height: "400px", overflow: "hidden" }}
        scrolling="no"
      ></iframe>
    </Container>
  );
};

export default Pagamento;
