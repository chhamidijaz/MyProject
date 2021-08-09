import React, { useEffect, useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { LOAD_POSTS } from "../GraphQL/Queries";
import Table from "@material-ui/core/Table";
import { makeStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory, Link } from "react-router-dom";

import "./Posts.css";
import { Feed } from "semantic-ui-react";
import { Button } from "@material-ui/core";

interface UserType {
  id: string;
  name: string;
}

interface PostType {
  id: string;
  body: string;
  user: UserType;
}

function Posts() {
  const [offset, setoffset] = useState(0);
  const [limit, setLimit] = useState(4);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { error, loading, data, refetch } = useQuery(LOAD_POSTS, {
    nextFetchPolicy: "network-only",
    variables: { limit, offset },
  });

  useEffect(() => {
    refetch();
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  return (
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
      {posts.length == limit && (
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

      {!posts.length && <h1>No more posts to show</h1>}
      <h1>All Posts</h1>
      <Link to="/createPost">
        <button className="btn" style={{ marginRight: "28%" }}>
          Create Post
        </button>
      </Link>

      {posts.map((post) => (
        <article className="art" key={post.id}>
          <div className="body">{post.body}</div>
          <div className="aurther">written by {post.user.name}</div>
        </article>
      ))}
    </div>

    // <TableContainer component={Paper}>
    //   <h1>All Posts</h1>
    //   <Link to="/createPost">
    //     <button className="button" style={{ marginRight: "28%" }}>
    //       Create Post
    //     </button>
    //   </Link>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>
    //           <strong style={{ fontSize: "130%" }}>ID</strong>
    //         </TableCell>
    //         <TableCell>
    //           <strong style={{ fontSize: "130%" }}>Content</strong>
    //         </TableCell>
    //         <TableCell>
    //           <strong style={{ fontSize: "130%" }}>Auther</strong>
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {posts.map((post) => (
    //         <TableRow key={post.id}>
    //           <TableCell component="th" scope="row">
    //             {post.id}
    //           </TableCell>
    //           <TableCell>{post.body}</TableCell>
    //           <TableCell>{post.user.name}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}

export default Posts;
