import { FC, ReactElement, useState, useMemo } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import {
  MuiPickersUtilsProvider,
  DatePicker ,
} from "@material-ui/pickers";
import { Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {format, sub } from 'date-fns'

import { UseAppQuery } from "../utils/server";

export interface BitcoinDetails  {
  id: string;
  key: string;
  total: number;
  primeNumbers: string;
  number: number;
}

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

const Home: FC<{}> = (): ReactElement => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState( format( sub(new Date(), {months: 6}), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState( format( new Date(), 'yyyy-MM-dd'));
  const memoizedParamData = useMemo(() => {return {params: { start: startDate , end: endDate}}}, [startDate, endDate]);
  const { apiData, isLoading } = UseAppQuery<Array<BitcoinDetails>>('/bitcoin/', memoizedParamData, [])
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
              <DatePicker 
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inlinerowData "
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(format( new Date(date?.toString() || ''), 'yyyy-MM-dd'))}
                minDate={sub(new Date(), {months: 6})}
                maxDate={sub(new Date(), {days: 1})}
                autoOk={true}
              />
            </Grid>
            <Grid item>
              <DatePicker 
              minDate={sub(new Date(), {months: 6})}
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inline"
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(format( new Date(date?.toString() || ''), 'yyyy-MM-dd'))}
                autoOk={true}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.dataArea}>
        <DataGrid loading={isLoading} rows={apiData} columns={tableColumns} pageSize={15} />
      </div>
    </div>
  );
};

export default Home;
