import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LOAD_ANY_User_POSTS } from "../GraphQL/Queries";

interface UserType {
  id: string;
  name: string;
}

interface Iid {
  id: string;
}

interface PostType {
  id: string;
  body: string;
  user: UserType;
}

const AnyUserPosts = () => {
  const { id }: Iid = useParams();
  const [posts, setPosts] = useState<PostType[]>([]);
  const { loading, error, data } = useQuery(LOAD_ANY_User_POSTS, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setPosts(data.anyUserPosts);
    }
  }, [data]);

  return (
    <div>
      <Link to="/users">
        <button className="btn pbtn">All Users</button>
      </Link>
      {posts.length ? (
        <div>
          <h1>{posts[0]?.user?.name}'s Posts</h1>
          {posts.map((post) => (
            <article className="art" key={post.id}>
              <div className="body">{post.body}</div>
            </article>
          ))}
        </div>
      ) : (
        <h1>This User have No Posts</h1>
      )}
    </div>
  );
};

export default AnyUserPosts;
