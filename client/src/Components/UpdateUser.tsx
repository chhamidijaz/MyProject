import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UPDATE_USER_MUTATION } from "../GraphQL/Mutations";
import { LOAD_ANY_USER, LOAD_USER } from "../GraphQL/Queries";

interface ParamTypes {
  id: string;
}

const UpdateUser = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const { id } = useParams<ParamTypes>();
  const { loading, data } = useQuery(LOAD_ANY_USER, {
    variables: { id },
  });

  const [updateUser, { error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      history.push("/users");
    },
  });

  const Update = () => {
    updateUser({
      variables: {
        id,
        name,
        email,
        role,
      },
    });
    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>User Detail</h1>
      <input
        type="text"
        placeholder={!loading && data.anyUser.name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder={!loading && data.anyUser.email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

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
        <option value={"admin"}>Make Admin</option>
      </select>

      {/* <input
        type="text"
        placeholder={!loading && data.anyUser.role}
        onChange={(e) => {
          setRole(e.target.value);
        }}
      /> */}

      <button className="form-submit-button" onClick={Update}>
        Update User
      </button>
    </div>
  );
};

export default UpdateUser;
