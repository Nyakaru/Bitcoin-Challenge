import { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography } from "@material-ui/core";

// components
import HomePage from "../components/Home";

// constants
import { APP_TITLE, PAGE_TITLE_HOME } from "../utils/constants";

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {

    },
  })
);

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Home</Typography>
      </Breadcrumbs>
      < HomePage />
    </div>
  );
};

export default Home;
