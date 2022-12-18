import React, { useState } from "react";
import { Container } from "react-bootstrap";

const Pagamento = (props) => {
  const [amount, setAmount] = useState(0.0);
  const [paymentId, setPaymentId] = useState(0.0);

  fetch(
    process.env.REACT_APP_API_URL +
      process.env.REACT_APP_PAYMENTS +
      "/" +
      new URLSearchParams(window.location.search).get("id")
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setAmount(data.grossAmount);
      setPaymentId(data.id);
    });

  return (
    <Container>
      <iframe
        title="newCard"
        src={
          "/pagseguro/newCardRegister.html?amount=" +
          amount +
          "&context=" +
          process.env.REACT_APP_API_CONTEXT +
          "&id=" +
          paymentId +
          "&webcontext=" +
          process.env.REACT_APP_WEB_URL
        }
        style={{ width: "100%", height: "800px", overflow: "hidden" }}
        scrolling="no"
      ></iframe>
    </Container>
  );
};

export default Pagamento;
