import { useQuery } from "@apollo/client";
import { Button, makeStyles, Paper, TableBody } from "@material-ui/core";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LOAD_USER } from "../GraphQL/Queries";
import Posts from "./Posts";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserProfile = () => {
  const classes = useStyles();

  const [user, setUser] = useState<UserType>();

  const { error, loading, data, refetch } = useQuery(LOAD_USER, {
    nextFetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  return (
    <>
      {" "}
      {user && <span className="userName">Welcome {user.name}</span>}
      <TableContainer component={Paper}>
        <Link to="/">
          <button className="btn pbtn">All Posts</button>
        </Link>
        <Link to="/createPost">
          <button className="btn" style={{ marginRight: "28%" }}>
            Create Post
          </button>
        </Link>

        <h1>All Users</h1>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong style={{ fontSize: "130%" }}>Name</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontSize: "130%" }}>EMAIL</strong>
              </TableCell>
              <TableCell>
                <strong style={{ fontSize: "130%" }}>Role</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>{user?.name}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.role}</TableCell>
          </TableBody>
        </Table>
        <Link
          to={`/update/user/${user?.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button fullWidth color="primary">
            Update Profile
          </Button>
        </Link>
      </TableContainer>
    </>
  );
};

export default UserProfile;
