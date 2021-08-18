import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { apiPostRequest, useAuthHandler } from "../utils/server";
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
const btnstyle = { margin: "8px 0" };
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const history = useHistory();
  const { setAuthStatus } = useAuthHandler({ token: "" });

  /**
   * @param {{ preventDefault: () => void; }} e
   */
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    authHandler();
  };
  const authHandler = async () => {
    try {
      setLoading(true);
      const request = {
        email: userEmail,
        password: userPassword,
      };
      console.log({ request });
      const userData = await apiPostRequest("users/login", request);
      const {
        data: { message, error },
      }: { data: AuthResponse } = userData;
      if (message) {
        setAuthStatus({ token: message });
        setLoading(false);
        history.push("/dashboard");
      }
      if (error) {
        const { message } = error;
        console.log(message);
        setAuthError(message);
        setLoading(false);
        setUserPassword("");
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
        <TextField
          onChange={(e) => setUserEmail(e.target.value)}
          label="Email"
          placeholder="Enter email"
          fullWidth
          style={btnstyle}
          required
        />
        <TextField
          onChange={(e) => setUserPassword(e.target.value)}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          style={btnstyle}
          required
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          onClick={(e) => {
            onSubmit(e);
          }}
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
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
        {authError ? <div style={{ color: "red" }}>{authError} </div> : ""}
      </Paper>
    </Grid>
  );
};

export default Login;
