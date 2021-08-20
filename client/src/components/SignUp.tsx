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
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ authError, setAuthError] = useState("");

  const history = useHistory();
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
        userName: userName,
      };
      console.log({ request })
      const userData = await apiPostRequest("users/signup", request);
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
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          onChange={(e) => setUserName(e.target.value)}
          label="Username"
          placeholder="Enter username"
          fullWidth
          style={btnstyle}
          required
        />
        <TextField
          onChange={(e) => setUserEmail(e.target.value)}
          label="Email"
          placeholder="Enter email"
          type="email"
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
          {loading ? <CircularProgress /> : "Sign up"}
        </Button>
        <Typography>
          {" "}
          Already have an account ?<Link href="/">Sign In</Link>
        </Typography>
        { authError ? <div style={{ color: "red"}}>{authError} </div> : ''}
      </Paper>
    </Grid>
  );
};

export default Signup;
