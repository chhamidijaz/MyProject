import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Error = () => {
  const history = useHistory();
  return (
    <div>
      <h1 style={{ color: "red" }}>Authentication Error</h1>
      <div
        style={{
          margin: "auto",
          width: "10%",
          padding: "10px",
          textDecoration: "none",
        }}
      >
        <Button color="primary" onClick={() => history.goBack()}>
          &#8606; Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;
