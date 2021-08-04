import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_POST_MUTATION } from "../GraphQL/Mutations";
import { LOAD_POST } from "../GraphQL/Queries";

interface ParamTypes {
  id: string;
}

const UpdatePost = () => {
  const history = useHistory();
  const [body, setBody] = useState<string>("");
  const { id } = useParams<ParamTypes>();

  const { loading, data } = useQuery(LOAD_POST, {
    variables: { id },
  });

  const [updatePost, { error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      history.push("/");
    },
  });

  const Update = () => {
    updatePost({
      variables: {
        id,
        body,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Post Detail</h1>
      <input
        type="text"
        placeholder={!loading && data.post.body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <button className="form-submit-button" onClick={Update}>
        Update Post
      </button>
    </div>
  );
};

export default UpdatePost;
