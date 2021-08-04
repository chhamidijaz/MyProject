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
import Pagination from "./Pagination";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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
  const history = useHistory();
  const classes = useStyles();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const { error, loading, data, refetch } = useQuery(LOAD_POSTS, {
    nextFetchPolicy: "network-only",
  });

  useEffect(() => {
    // refetch();
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>All Posts</h1>
      <Link to="/createPost">
        <button className="btn" style={{ marginRight: "28%" }}>
          Create Post
        </button>
      </Link>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      {currentPosts.map((post) => (
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
