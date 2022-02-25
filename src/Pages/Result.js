import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const Result = ({ score, setScore }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.result}>
      <span className={classes.score}>Final Score :{score}</span>
      <Button
        style={{ marginTop: 100 }}
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => {
          navigate("/");
          setScore(0);
        }}
      >
        Return to Home Page
      </Button>
    </div>
  );
};

export default Result;
const useStyles = makeStyles((theme) => {
  return {
    result: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      flexDirection: "column",
    },
    score: {
      border: "1px solid black",
      padding: "10px 50px",
      fontSize: "4vw",
      display: "flex",
      justifyContent: "center",
      boxShadow: "4px 4px 2px black",
    },
  };
});
