import { FC, ReactElement, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    header: {
      display: "flex",
    },
    dataArea: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      height: 600,
    },
    dataTable: {
      border: "1px solid gray",
    },
    dataCard: {
      width: "35%",
      border: "1px solid gray",
      marginLeft: "2%",
      display: "flex",
      flexDirection: "column",
    },
    title: {
      fontSize: 20,
    },
    cardContent: {
      textAlign: "center",
    },
    card: {},
  })
);

const WishList: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const tableColumns = [
    {
      field: "key",
      headerName: "Data date",
      flex: 1,
    },
    {
      field: "number",
      headerName: "Bitcoin value",
      flex: 1,
    },
    {
      field: "primeNumbers",
      headerName: "Prime Numbers",
      type: "number",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Prime Total",
      type: "number",
      flex: 1,
    },
  ];
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={selectedDate}
              onChange={() => {}}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-picker-inline"
              label="End Date"
              value={selectedDate}
              onChange={() => {}}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <div className={classes.dataArea}>
        <DataGrid
          className={classes.dataTable}
          rows={[]}
          columns={tableColumns}
          pageSize={15}
        />
        <div className={classes.dataCard}>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Total Bitcoin Value
              </Typography>
              <Typography variant="h5" component="h2">
                307
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Add to wish list
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={selectedDate}
                  onChange={() => {}}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <Button variant="contained" color="primary">
                  Add
                </Button>
              </MuiPickersUtilsProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WishList;
