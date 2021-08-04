import React, { useState } from "react";
import { LOGIN_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./Form.css";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@material-ui/core";

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const [login, { error, data: _data, loading }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      onCompleted: (val) => {
        window.localStorage.setItem("token", val?.login?.token);
        history.push("/");
        window.location.reload();
      },
      onError: () => {
        history.push("/error");
      },
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
    login({
      variables: {
        email: email,
        password: password,
      },
    });
    if (error) {
      console.log(error);
    }
    if (_data) {
      debugger;
      alert("data");
    }
  };
  // if (loading) return "...";
  // if (error) return `Submission error!`;
  // if (_data) {
  //   debugger;
  // }

  return (
    <div>
      <h1 style={{ color: "green" }}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="text"
          required
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <input
          {...register("password")}
          type="password"
          required
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input type="submit" />
      </form>
      <Link to="/signup" style={{ textDecoration: "none", marginLeft: "43%" }}>
        <Button color="primary" size="large" variant="contained">
          Create a New Account?
        </Button>
      </Link>
    </div>
  );
}

export default Login;
