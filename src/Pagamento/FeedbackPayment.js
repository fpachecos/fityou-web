import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";

const FeedbackPayment = (props) => {
  const [payment, setPayment] = useState(null);

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
      setPayment(data);
    });

  const format = (amount) => {
    var formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    return formatter.format(amount);
  };

  return (
    <Container>
      {payment != null ? (
        <Alert variant="success">
          Seu pagamento de {format(payment.grossAmount)} em{" "}
          {payment.installments} parcela{payment.installments > 1 ? "s" : ""}{" "}
          foi realizado com sucesso!
        </Alert>
      ) : (
        "Carregando ..."
      )}
    </Container>
  );
};

export default FeedbackPayment;
