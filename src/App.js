import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import axios from "axios";

const App = () => {
  const classes = useStyles();
  // State
  const [name, setName] = useState("");
  const [question, setQuestion] = useState([]);
  const [score, setScore] = useState(0);
  // Function
  const fetchQuestion = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestion(data.results);
  };
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Header />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                setName={setName}
                name={name}
                fetchQuestion={fetchQuestion}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                question={question}
                score={score}
                name={name}
                setQuestion={setQuestion}
                setScore={setScore}
              />
            }
          />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

const useStyles = makeStyles((theme) => {
  return {
    app: {
      minHeight: "98.5vh",
      backgroundImage: "url(/ques1.png)",
      border: "8px solid #39445a93",
      margin: 5,
      padding: 5,
    },
  };
});
