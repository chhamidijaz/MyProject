import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DELETE_POST_MUTATION } from "../GraphQL/Mutations";
import { LOAD_User_POSTS } from "../GraphQL/Queries";
import Pagination from "./Pagination";
import "./Posts.css";

interface UserType {
  id: string;
  name: string;
}

interface PostType {
  id: string;
  body: string;
  user: UserType;
}

interface Iid {
  id: string;
}

const UserPosts = () => {
  const { id }: Iid = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [posts, setPosts] = useState<PostType[]>([]);
  const { error, loading, data, refetch } = useQuery(LOAD_User_POSTS, {
    variables: { id },
  });

  const [deleteUser] = useMutation(DELETE_POST_MUTATION);

  const DeletePost = (id: string) => {
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
      setPosts(data.userPosts);
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
      <Link to="/createPost">
        <button className="button" style={{ marginRight: "28%" }}>
          Create Post
        </button>
      </Link>
      <Link to="/users">
        <button className="btn pbtn">All Users</button>
      </Link>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      {posts.length ? (
        <div>
          <h1>My Posts</h1>
          {currentPosts.map((post) => (
            <article className="art" key={post.id}>
              <div className="body">{post.body}</div>
              <div className="example"></div>
              <Link
                to={`/update/post/${post?.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="primary">Update User</Button>
              </Link>
              <Button
                color="secondary"
                onClick={() => {
                  const check = window.confirm(
                    "The Post will be permanently deleted, Want to continue?"
                  );

                  {
                    check && DeletePost(post.id);
                    refetch();
                  }
                }}
              >
                Detele User
              </Button>
            </article>
          ))}
        </div>
      ) : (
        <h1>You don't have any posts</h1>
      )}
    </div>
  );
};

export default UserPosts;
