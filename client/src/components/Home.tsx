import { FC, ReactElement, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

// define css-in-js
const useStyles = makeStyles(() =>
  createStyles({
    root: { display: "flex", alignItems: "center", flexDirection: "column" },
    header: {
      width: "80%",
    },
    dataArea: {
      width: "80%",
      height: 600
    },
  })
);

const rowData = [
  {
    id: 1,
    key: new Date("2014-08-18T21:11:54"),
    number: 259,
    primeNumbers: "2,5",
    total: 7,
  },
  {
    id: 2,
    key: new Date("2014-08-18T21:11:54"),
    number: 259,
    primeNumbers: "2,5",
    total: 7,
  }
];

const Home: FC<{}> = (): ReactElement => {
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
      flex: 0.7,
    },
    {
      field: "primeNumbers",
      headerName: "Prime Numbers",
      type: "number",
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Prime Total",
      type: "number",
      flex: 0.7,
    },
  ];
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={3}>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inlinerowData "
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
      </div>
      <div className={classes.dataArea}>
        <DataGrid rows={rowData} columns={tableColumns} pageSize={15} />
      </div>
    </div>
  );
};

export default Home;
