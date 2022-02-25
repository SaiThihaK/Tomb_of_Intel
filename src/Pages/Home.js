import { Button, makeStyles, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Component/Error";
import Categories from "../Data/Categories";

const Home = ({ name, setName, fetchQuestion }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  // State
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [warning, setWarning] = useState(false);
  const difficulties = [
    { level: "easy" },
    { level: "medium" },
    { level: "hard" },
  ];
  // Function
  const submitHandler = () => {
    if (!category || !difficulty || !name) {
      setWarning(true);
      return;
    }
    setWarning(true);
    fetchQuestion(category, difficulty);
    navigate("/quiz");
  };
  return (
    <div className={classes.content}>
      <div className={classes.setting}>
        <span style={{ fontSize: 30 }}>Quiz Setting</span>
        {warning && <Error />}
        <div className={classes.setting_select}>
          <TextField
            label="Enter Your Name"
            variant="outlined"
            style={{ marginBottom: 20 }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            variant="outlined"
            style={{ marginBottom: 20 }}
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 20 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty || ""}
          >
            {difficulties.map((dif) => (
              <MenuItem
                key={dif.level}
                value={dif.level}
                style={{ textTransform: "Capitalize" }}
              >
                {dif.level}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={submitHandler}
          >
            START QUIZ
          </Button>
        </div>
      </div>

      <img src="/quiz.svg" className={classes.banner} alt="banner" />
    </div>
  );
};

export default Home;

const useStyles = makeStyles((theme) => {
  return {
    content: {
      display: "flex",
      justifyContent: "space-around",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column-reverse",
      },
    },
    setting: {
      width: "45%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Poppins ,sans-serif",
      fontWeight: 300,
      padding: 20,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    banner: {
      width: "55%",
      alignSelf: "center",
      padding: 8,
      margin: 20,
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
    },
    setting_select: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "space-evenly",
      marginTop: 20,
    },
  };
});
