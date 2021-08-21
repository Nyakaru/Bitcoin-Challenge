import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { apiPostRequest, useAuthHandler } from "../utils/server";
import { LoginResponse } from "../interface";

const paperStyle = {
  padding: 20,
  height: "45vh",
  width: 380,
  margin: "20px auto",
  paddingBottom: "0px",
  marginTop: "200px",
};
const avatarStyle = { backgroundColor: "#1bbd7e", margin: "0 auto" };
const btnstyle = { margin: "8px 0" };
const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const history = useHistory();
  const { setAuthStatus } = useAuthHandler({ token: "", userId: 0 });

  const authHandler = async (data: any) => {
    try {
      setLoading(true);
      const request = {
        email: data?.email,
        password: data?.password,
      };
      const userData = await apiPostRequest("/users/login", request);
      const {
        data: { user, error },
      }: { data: LoginResponse } = userData;
      if (user) {
        setAuthStatus({ token: user.token, userId: user.userId });
        setLoading(false);
        history.push("/home");
      }
      if (error) {
        const { message } = error;
        console.log(message);
        setAuthError(message);
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
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit(authHandler)} >
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          style={btnstyle}
          {...register("email", { required: true })}
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
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Sign In"}
        </Button>
        <Typography style={btnstyle}>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="/signup">Sign Up</Link>
        </Typography>
        {authError ? <div style={{ color: "red" }}>{authError} </div> : ""}
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
