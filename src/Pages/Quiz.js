import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const Quiz = ({ question, score, name, setScore, setQuestion }) => {
  const [option, setOption] = useState();
  const [currQ, setCurrQ] = useState(0);
  console.log(question);
  const handleShuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    setOption(
      //I try with "question &&" and  question.length(got option=false)
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
  console.log(option);

  const classes = useStyles();
  return (
    <div className={classes.quiz}>
      <span className={classes.subTitle}>{name}</span>
    </div>
  );
};

export default Quiz;

const useStyles = makeStyles((theme) => {
  return {
    quiz: {},
    subTitle: {},
  };
});
