import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Component/Error";

const Quiz = ({ question, score, name, setScore, setQuestion }) => {
  // State
  const [option, setOption] = useState();
  const [currQ, setCurrQ] = useState(0);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);
  // navigate
  const navigate = useNavigate();
  useEffect(() => {
    setOption(
      //I try with "question &&" and  question.length(got option=false)
      // I solve this problem by giving the initail state of question from [] to undefined
      //
      question &&
        handleShuffle([
          // I also try with question[currQ]?.correct_answer || "",
          // (...question[currQ]?.incorrect_answers ||"")
          // That solve the error value but it gives option as [""]
          question[currQ]?.correct_answer,
          ...question[currQ]?.incorrect_answers,
        ])
    );
  }, [currQ, question]);
  // Function
  const handleCheck = (opt) => {
    setSelected(opt);
    setDisable(true);
    if (opt === question[currQ].correct_answer) {
      setScore(score + 1);
      setError(false);
    }
  };
  const handleSelected = (opt) => {
    if ((selected === opt) & (selected === question[currQ].correct_answer))
      return classes.correct;
    // If my answer is rignt it will show green
    else if ((selected === opt) & (selected !== question[currQ].correct_answer))
      return classes.wrong;
    // if my answer is wrong it will show red
    else if (opt === question[currQ].correct_answer) return classes.correct;
    // if my answer is wrong ,this will show right answer with green color together with my red colored wrong answer
  };

  const handleShuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  const handleQuit = () => {
    setQuestion(undefined);
    setCurrQ(0);
    navigate("/");
  };
  const handleNext = () => {
    if (!selected) {
      setError(true);
      return;
    }
    if (currQ > 8) {
      navigate("/result");
    } else {
      setCurrQ(currQ + 1);
      setSelected("");
      setError(false);
      setDisable(false);
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.quiz}>
      <span className={classes.subTitle}>Welcome,{name}</span>
      {question ? (
        <>
          <div className={classes.quizInfo}>
            <span>{question[currQ].category}</span>
            <span>Score:{score}</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 40 }}>Question:{currQ + 1}</span>
            <div className={classes.quizBox}>
              <h2 style={{ fontFamily: "Poppins" }}>
                {question[currQ].question}
              </h2>
              {error && <Error>Please Select One Ansewer</Error>}
              <div className={classes.option}>
                {option &&
                  option.map((opt) => (
                    <Button
                      color="inherit"
                      className={`${classes.button} ${
                        disable && handleSelected(opt)
                      }`}
                      key={opt}
                      onClick={() => {
                        handleCheck(opt);
                      }}
                      size="large"
                      disabled={disable}
                    >
                      {opt}
                    </Button>
                  ))}
              </div>
              <div className={classes.btnBox}>
                <Button
                  className={classes.btn}
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleQuit}
                >
                  Quit
                </Button>
                <Button
                  className={classes.btn}
                  color="primary"
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                >
                  Next Question
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;

const useStyles = makeStyles((theme) => {
  return {
    quiz: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: ("Poppins", "sans-serif"),
    },
    subTitle: {
      fontSize: "3vw",
      padding: "5px 10px",
      border: "1px solid black",
      boxShadow: "4px 4px 2px black",
      marginTop: 10,
    },
    quizInfo: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      margin: 20,
      fontFamily: "Poppins",
      fontSize: "16px",
      textTransform: "upperCase",
    },
    quizBox: {
      border: "3px solid gray",
      width: "95%",
      margin: 30,
      padding: 20,
      borderRadius: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    option: {
      marginTop: 30,
      display: "grid",
      gridGap: 30,
      gridTemplateColumns: "1fr 1fr",
      [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: "1fr",
      },
    },
    button: {
      border: "1px solid gray",
    },
    correct: {
      backgroundColor: "green",
      color: "white",
    },
    wrong: {
      backgroundColor: "red",
      color: "white",
    },
    btnBox: {
      marginTop: 30,
      display: "flex",
      justifyContent: "space-around",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    btn: {
      width: 200,
      [theme.breakpoints.down("sm")]: {
        marginTop: 30,
      },
    },
  };
});
