import React from "react";
import app from "../../firebase/firebase";
import styled from "styled-components";
function Home() {
  const logout = () => {
    app.auth().signOut();
  };
  return (
    <div>
      home
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Home;
