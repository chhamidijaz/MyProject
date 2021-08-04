import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";
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
  const history = useHistory();
  const classes = useStyles();
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const { error, loading, data, refetch } = useQuery(LOAD_USERS, {
    nextFetchPolicy: "network-only",
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
      setUsers(data.users);
    }
  }, [data]);

  // Get current posts
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <TableContainer component={Paper}>
      <Link to="/">
        <button className="btn pbtn">All Posts</button>
      </Link>
      <Link to="/createPost">
        <button className="btn" style={{ marginRight: "28%" }}>
          Create Post
        </button>
      </Link>

      <Pagination
        postsPerPage={usersPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />

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
          {currentUsers.map((user) => (
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
                    }
                  }}
                >
                  Detele User
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GetUsers;
