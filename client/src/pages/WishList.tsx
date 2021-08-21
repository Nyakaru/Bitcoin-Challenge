import { FC, ReactElement } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Breadcrumbs, Typography } from "@material-ui/core";

// components
import WishList from "../components/WishList";
import { UseAppRedirect } from "../utils/server";

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

const Home: FC<{}> = (): ReactElement => {
  UseAppRedirect();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Wish List</Typography>
      </Breadcrumbs>
      <WishList />
    </div>
  );
};

export default Home;
