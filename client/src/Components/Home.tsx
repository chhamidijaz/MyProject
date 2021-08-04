import "./Home.css";
import GetUsers from "./GetUsers";
import { Link, useHistory } from "react-router-dom";
import Posts from "./Posts";
import { useQuery } from "@apollo/client";
import { LOAD_USER } from "../GraphQL/Queries";
import { useEffect } from "react";
import { useState } from "react";

function Home() {
  const [userName, setUserName] = useState("");
  const history = useHistory();
  const { error, loading, data, refetch } = useQuery(LOAD_USER, {
    nextFetchPolicy: "network-only",
  });

  useEffect(() => {
    refetch();
    if (data) {
      setUserName(data?.user?.name);
      // console.log(data.user.name);
    }
  }, [data]);

  return (
    <>
      {userName?.length && <h1 className="userName">Welcome {userName}</h1>}
      <Posts />
      <Link to="/users">
        <button className="btn pbtn">All Users</button>
      </Link>
    </>
  );
}

export default Home;
