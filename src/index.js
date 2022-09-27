import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import FitYouNavbar from "./fitYouNavbar";
import Exercise from "./Exercises/Exercise";
import WorkoutCreation from "./WorkoutCreation/WorkoutCreation";
import WorkoutList from "./Workout/WorkoutList";
import Pagamento from "./Pagamento/Pagamento";
import People from "./Person/People";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FitYouNavbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/exercise" exact element={<Exercise />} />
        <Route
          path="/workoutcreation/:id"
          exact
          element={<WorkoutCreation />}
        />
        <Route path="/workout" exact element={<WorkoutList />} />
        <Route path="/pagamento" exact element={<Pagamento />} />
        <Route path="/people" exact element={<People />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
