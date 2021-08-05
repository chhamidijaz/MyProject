import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_USER, LOAD_USERS } from "../GraphQL/Queries";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { DELETE_USER_MUTATION } from "../GraphQL/Mutations";
import { useHistory } from "react-router-dom";
import Pagination from "./Pagination";

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

const GetUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<UserType[]>([]);
  const [userRole, setUserRole] = useState("");
  const [offset, setoffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data: userLoggedin, refetch: userRefetch } = useQuery(LOAD_USER, {
    nextFetchPolicy: "network-only",
  });

  const { error, loading, data, refetch } = useQuery(LOAD_USERS, {
    nextFetchPolicy: "network-only",
    variables: { limit, offset },
  });
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const DeleteUser = (id: string) => {
    deleteUser({
      variables: {
        id,
      },
    });
    refetch();
  };

  useEffect(() => {
    refetch();
    if (data) {
      setUserRole(userLoggedin?.user?.role);
      setUsers(data.users);
    }
  }, [data]);

  return (
    <>
      {offset != 0 && (
        <Button
          color="primary"
          style={{
            float: "left",
            left: "5%",
          }}
          onClick={() => setoffset(offset - limit)}
        >
          &#171; Previous
        </Button>
      )}
      {users.length == limit && (
        <Button
          color="primary"
          style={{
            float: "right",
            right: "5%",
          }}
          onClick={() => {
            setoffset(offset + limit);
          }}
        >
          Next &#187;
        </Button>
      )}
      {!users.length && <h1>No more posts to show</h1>}

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
                <strong style={{ fontSize: "130%" }}>ID</strong>
              </TableCell>
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Link
                    to={`/users/${user?.id}/posts`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button color="primary">posts</Button>
                  </Link>
                  {userRole == "admin" ? (
                    <span>
                      <Link
                        to={`/update/user/${user?.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="primary">Update User</Button>
                      </Link>
                      <Button
                        color="secondary"
                        onClick={() => {
                          const check = window.confirm(
                            "User and the related posts will be deleted, Want to continue?"
                          );

                          {
                            check && DeleteUser(user.id);
                            refetch();
                            window.location.reload();
                          }
                        }}
                      >
                        Detele User
                      </Button>
                    </span>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default GetUsers;
