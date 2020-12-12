import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "5rem 1rem",
    flexDirection: "column",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <Container size="lg">
      <div className={classes.root}>
        <CircularProgress />
        <br />
        <Typography color="textSecondary">Loading...</Typography>
      </div>
    </Container>
  );
}
