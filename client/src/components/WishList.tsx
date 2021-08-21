import { FC, ReactElement, useState, useMemo } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { DataGrid } from "@material-ui/data-grid";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {format, sub } from 'date-fns'

import { UseAppQuery , getStoredUserAuth, apiPostRequest} from "../utils/server";
export interface WishListValue{
id: number;
day: string;
value: number;
prime: number
}

export interface WishListRes{
  wishList: Array<WishListValue>;
  total: number
  }


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
      display: 'flex',
      flexDirection: "column",
    },
    cardButton: { marginTop: 20},
  })
);

const WishList: FC<{}> = (): ReactElement => {
  const { userId } = getStoredUserAuth()
  const classes = useStyles();
  const [startDate, setStartDate] = useState<string | null>( null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [wishValueDate, setWishValueDate] = useState<string | null>(null);
  const memoizedParamData = useMemo(() => {return {params: { start: startDate , end: endDate}}}, [startDate, endDate]);
  const { apiData, isLoading } = UseAppQuery<WishListRes>(`/wishlist/${userId}`, memoizedParamData, {total: 0, wishList: []}, refresh)
  const { total, wishList } = apiData;
  const tableColumns = [
    {
      field: "day",
      headerName: "Data date",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Bitcoin value",
      type: "number",
      flex: 1,
    },
    {
      field: "prime",
      headerName: "Total Prime Numbers",
      type: "number",
      flex: 1,
    },
  ];

  const handleDateAdd = async() => {
    const postData ={
      userId,
      date: wishValueDate
    }
    await apiPostRequest("/wishlist/add", postData);
    setRefresh(!refresh);
  }
  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item>
            <DatePicker
              disableToolbar
              variant="inline"
              margin="normal"
              id="date-picker-inline"
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(format( new Date(date?.toString() || ''), 'yyyy-MM-dd'))}
              autoOk={true}
            />
          </Grid>
          <Grid item>
            <DatePicker
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
      <div className={classes.dataArea}>
        <DataGrid
          className={classes.dataTable}
          rows={wishList}
          columns={tableColumns}
          pageSize={15}
          loading={isLoading}
        />
        <div className={classes.dataCard}>
          <Card variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Total Bitcoin Value
              </Typography>
              <Typography variant="h5" component="h2">
                {total}
              </Typography>
            </CardContent>
          </Card>
          <Card  variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Add to wish list
              </Typography>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableToolbar
                  variant="inline"
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  value={wishValueDate}
                  onChange={(date) => setWishValueDate(format( new Date(date?.toString() || ''), 'yyyy-MM-dd'))}
                  maxDate={sub(new Date(), {days: 1})}
                  autoOk={true}
                />
              </MuiPickersUtilsProvider>
              <Button className={classes.cardButton} onClick={handleDateAdd} variant="contained" color="primary">
                  Add
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WishList;
