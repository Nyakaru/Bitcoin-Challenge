import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { apiPostRequest } from "../utils/server";
import { AuthResponse } from "../interface";

const paperStyle = {
  padding: 20,
  height: "45vh",
  width: 380,
  margin: "20px auto",
  paddingBottom: "0px",
  marginTop: "200px",
};
const avatarStyle = { backgroundColor: "#1bbd7e", margin: "0 auto" };
const btnstyle = { margin: "10px 0" };

const Signup = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    userName: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm( {resolver: yupResolver(schema)});
  const [loading, setLoading] = useState(false);
  const [ authError, setAuthError] = useState("");

  const history = useHistory();
  /**
   * @param {{ preventDefault: () => void; }} e
   */
  const authHandler = async (data: any) => {
    try {
      setLoading(true);
      const request = {
        email: data?.email,
        password: data?.password,
        userName: data?.userName,
      };
      console.log({ request })
      const userData = await apiPostRequest("/users/signup", request);
      const {
        data: { message, error },
      }: { data: AuthResponse } = userData;
      if (message) {
        setLoading(false);
        history.push("/");
      } if ( error ) {
        const { message } = error;
        console.log(message);
        setAuthError(message)
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "err");
      setLoading(false);
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <form onSubmit={handleSubmit(authHandler)}>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          style={btnstyle}
          {...register("userName", { required: true})}
        />
        {errors?.userName?.message &&  <div style={{ color: "red" }}>{errors?.userName?.message}</div>}
        <TextField
          label="Email"
          placeholder="Enter email"
          type="email"
          fullWidth
          style={btnstyle}
          {...register("email", { required: true})}
        />
        {errors?.email?.message &&  <div style={{ color: "red" }}>{errors?.email?.message}</div>}
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          style={btnstyle}
          {...register("password", { required: true})}
        />
        {errors?.password?.message &&  <div style={{ color: "red" }}>{errors?.password?.message}</div>}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Sign up"}
        </Button>
        <Typography>
          {" "}
          Already have an account ?<Link href="/">Sign In</Link>
        </Typography>
        { authError ? <div style={{ color: "red"}}>{authError} </div> : ''}
        </form>
      </Paper>
    </Grid>
  );
};

export default Signup;
