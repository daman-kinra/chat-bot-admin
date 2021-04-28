import React, { useState } from "react";
import app from "../../firebase/firebase";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Mainarea from "../../components/Mainarea/Mainarea";
import Profile from "../../components/Profile/Profile";

function Home(props) {
  const [showProfile, setShowProfile] = useState(false);
  // console.log(props.user);
  const logout = () => {
    app
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
      });
  };
  const setMainarea = (isVissible) => {
    setShowProfile(isVissible);
  };
  return (
    <div className="home__main">
      {/*Navbar is sidebar and Sidebar is navbar */}
      <Navbar
        user={props.user}
        logout={logout}
        showProfile={showProfile}
        setMainarea={setMainarea}
      ></Navbar>
      {showProfile ? <Profile user={props.user} /> : <Mainarea />}
    </div>
  );
}

export default Home;
