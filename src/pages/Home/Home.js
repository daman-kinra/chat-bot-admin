import React from "react";
import app from "../../firebase/firebase";
import "./home.css";
function Home(props) {
  console.log(props.user);
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
