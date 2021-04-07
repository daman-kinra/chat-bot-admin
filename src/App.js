import React from "react";
import app from "./firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import styled from "styled-components";

function App() {
  const [user, loading] = useAuthState(app.auth());

  if (loading) {
    return (
      <LoadingArea>
        <HashLoader
          color={"#ea4c89"}
          loading={true}
          css={override}
          size={150}
        />
      </LoadingArea>
    );
  }
  if (!user) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    );
  }
  if (user) {
    return <Home user={user} />;
  }
}

const LoadingArea = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2d184;
`;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: pink;
`;

export default App;
