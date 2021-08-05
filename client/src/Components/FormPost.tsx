import React, { useState } from "react";
import { CREATE_POST_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./Form.css";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@material-ui/core";

interface IFormInput {
  body: string;
  userId: string;
}

const schema = yup.object().shape({
  body: yup.string().required(),
});

const FormPost = () => {
  const [body, setBody] = useState<string>("");

  const history = useHistory();
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    onError: () => {
      history.push("/error");
    },
    onCompleted: () => {
      history.push("/posts");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    createPost({
      variables: {
        body: body,
      },
    });
    if (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to="/users">
        <button className="btn pbtn">All Users</button>
      </Link>
      <Link to="/">
        <button className="btn" style={{ marginRight: "28%" }}>
          All Posts
        </button>
      </Link>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("body")}
          type="text"
          required
          placeholder="Enter Content"
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />

        <input type="submit" />
        <Button
          color="primary"
          onClick={() => history.goBack()}
          style={{ margin: "5% 40%" }}
        >
          &#8606; Go Back
        </Button>
      </form>
    </div>
  );
};

export default FormPost;
