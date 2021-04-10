import React from "react";
import "./navbar.css";
import images from "../../images/leftpart_bg.png";
function Navbar(props) {
  return (
    <div className="left__container">
      <header>
        <h2 className="title admin__name">
          {props.user.displayName ? props.user.displayName : "Admin"}
        </h2>
        <div className="btns">
          {props.showProfile ? (
            <button
              className="login__btn"
              onClick={() => {
                props.setMainarea(false);
              }}
            >
              Home
            </button>
          ) : (
            <button
              className="login__btn"
              onClick={() => {
                props.setMainarea(true);
              }}
            >
              Profile
            </button>
          )}
          <button className="login__btn" onClick={props.logout}>
            Logout
          </button>
        </div>
      </header>
      <div className="artarea">
        <div className="art__image">
          <img src={images} alt="" className="left__bg__img" />
        </div>
        <div className="footer">
          <p>BY XCLS00</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
