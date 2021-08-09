import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import UpdateUser from "./Components/UpdateUser";
import Posts from "./Components/Posts";
import FormPost from "./Components/FormPost";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Error from "./Components/Error";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import PrivateRoute from "./Components/PrivateRoute";
import GetUsers from "./Components/GetUsers";
import UserPosts from "./Components/UserPosts";
import AnyUserPosts from "./Components/AnyUserPosts";
import UpdatePost from "./Components/UpdatePost";
import UserProfile from "./Components/UserProfile";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Home
          </Button>
        </Link>
        {window.localStorage.token ? (
          <div>
            <button
              onClick={() => {
                window.localStorage.removeItem("token");
                window.location.reload();
              }}
              className="btn lbtn"
            >
              LOGOUT
            </button>
            <Link to="/profile">
              <button
                onClick={() => {}}
                className="btn"
                style={{ float: "right", marginRight: "56%" }}
              >
                My profile
              </button>
            </Link>
            <Link to="/posts">
              <button
                onClick={() => {}}
                className="btn"
                style={{ float: "right", marginRight: "42%" }}
              >
                Myposts
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn lbtn">Login</button>
          </Link>
        )}

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/createPost" component={FormPost} />
          <PrivateRoute path="/profile" component={UserProfile} />
          <PrivateRoute exact path="/users" component={GetUsers} />
          <Route path="/error" component={Error} />
          <PrivateRoute path="/posts" component={UserPosts} />
          <PrivateRoute path="/users/:id/posts" component={AnyUserPosts} />
          <PrivateRoute path="/update/user/:id" component={UpdateUser} />
          <PrivateRoute path="/update/post/:id" component={UpdatePost} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
