import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation, useLazyQuery } from "@apollo/client";
import { LOAD_SEARCHED_USER, LOAD_USER, LOAD_USERS } from "../GraphQL/Queries";
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
  const [nameforSearch, setnameforSearch] = useState("");
  const [offset, setoffset] = useState(0);
  const [len, setLen] = useState(0);
  const [limit, setLimit] = useState(10);
  const { data: userLoggedin, refetch: userRefetch } = useQuery(LOAD_USER, {
    nextFetchPolicy: "network-only",
  });

  const { error, loading, data, refetch } = useQuery(LOAD_USERS, {
    nextFetchPolicy: "network-only",
    variables: { limit, offset },
  });

  const [searchUser, { data: searchedData }] = useLazyQuery(LOAD_SEARCHED_USER);

  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const DeleteUser = (id: string) => {
    deleteUser({
      variables: {
        id,
      },
    });
    refetch();
  };

  const search = () => {
    searchUser({
      variables: {
        name: nameforSearch,
      },
    });
  };

  useEffect(() => {
    refetch();
    if (data && nameforSearch.length > 0) {
      setUsers(searchedData?.searchUser);
      setLen(searchedData?.searchUser.length);
    }
    if (data && nameforSearch == "") {
      setUserRole(userLoggedin?.user?.role);
      setUsers(data?.users);
      setLen(data?.users.length);
    }
  }, [data, searchedData]);

  return (
    <>
      {nameforSearch.length == 0 && (
        <div>
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
          <span
            className="pg"
            style={{
              color: "red",
              fontSize: "100%",
              position: "absolute",
              right: "17%",
              top: "17%",
            }}
          >
            Page Number: {offset == 0 ? 1 : offset / limit + 1}
          </span>
        </div>
      )}

      <div className="searchForm" style={{ float: "left", width: "20%" }}>
        <input
          style={{ width: "80%" }}
          placeholder="Search for..."
          type="text"
          onChange={(e) => {
            setnameforSearch(e.target.value);
          }}
        />
        <button style={{ width: "20%" }} onClick={search}>
          search
        </button>
      </div>
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
            {users?.map((user) => (
              <TableRow key={user.id}>
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
