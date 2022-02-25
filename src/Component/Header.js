import { makeStyles } from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.header}>
      <h1 className={classes.title} onClick={() => navigate("/")}>
        Tomb_of_Intel
      </h1>
      <hr className={classes.divider} />
    </div>
  );
};

export default Header;

const useStyles = makeStyles((theme) => {
  return {
    title: {
      fontSize: "6vw",
      fontWeight: 500,
      textTransform: "upperCase",
      fontFamily: "Montserrat, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      cursor: "pointer",
    },
    divider: {
      marginTop: 10,
      width: "100%",
      backgroundColor: "grey",
    },
  };
});
