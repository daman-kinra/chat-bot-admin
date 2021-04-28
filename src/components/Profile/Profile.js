import React from "react";
import "./profile.css";
import avatar from "../../images/avatar.png";
function Profile(props) {
  return (
    <div className="mainarea profile__area">
      <img src={avatar} alt="" />
      <h3>{props.user.email}</h3>
    </div>
  );
}

export default Profile;
