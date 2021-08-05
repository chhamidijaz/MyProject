import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import "./Form.css";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@material-ui/core";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  role: number;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
});

function Signup() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("General");
  const history = useHistory();
  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: () => {
      history.push("/login");
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
    createUser({
      variables: {
        name: name,
        email: email,
        password: password,
        role: role,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign UP</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          type="text"
          required
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        {/* <input
          {...register("role")}
          type="text"
          required
          placeholder="Role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        /> */}

        <select
          required
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value={"General"}>General</option>
          <option value={"Software Engineer"}>Software Engineer</option>
          <option value={"Marketing Strategist"}>Marketing Strategist</option>
          <option value={"UX Designer"}>UX Designer</option>
          <option value={"Content Specialist"}>Content Specialist</option>
        </select>

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
      <Link to="/login" style={{ textDecoration: "none", marginLeft: "41%" }}>
        <Button color="primary" size="large" variant="contained">
          Already have an Account? Login
        </Button>
      </Link>
    </div>
  );
}

export default Signup;
