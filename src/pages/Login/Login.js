import React, { useState, useEffect } from "react";
import app from "../../firebase/firebase";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import images from "../../images/leftpart_bg.png";
import { Link } from "react-router-dom";
import "./login.css";
function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorFromFirebse, setErrorFromFirebse] = useState("");
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const login = (e) => {
    e.preventDefault();
    if (email === "") {
      setError("email");
      return;
    }
    if (!validateEmail(email.toLowerCase().trim())) {
      setError("invalid");

      return;
    }
    if (password === "") {
      setError("password");

      return;
    }
    setLoading(true);
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setErrorFromFirebse(err.code);
        setLoading(false);
      });
  };
  useEffect(() => {
    const errorText = document.getElementById("scrollIntoView");
    if (errorText) {
      errorText.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [error, loading]);
  return (
    <>
      {loading ? (
        <LoadingArea>
          <HashLoader
            color={"#ea4c89"}
            loading={true}
            css={override}
            size={150}
          />
        </LoadingArea>
      ) : (
        <div className="login__main__container">
          <div className="left__container">
            <header>
              <h2 className="title">chat bot admin</h2>
              <h2 className="text">
                Welcome to the admin portal of student's help chat bot.
              </h2>
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
          <div className="right__container">
            <div className="login__box">
              <div className="header">
                <h2>Login to Admin Dashboard</h2>
              </div>
              <form action="">
                <label htmlFor="email">E-mail ID:</label>
                <input
                  type="text"
                  className="input"
                  placeholder="E-mail ID"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error === "email" || error === "invalid" ? (
                  <span className="error" id="scrollIntoView">
                    * Invalid Email
                  </span>
                ) : (
                  <span className="error"></span>
                )}

                <label htmlFor="pass">Password:</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  id="pass"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
                {error === "password" ? (
                  <span className="error" id="scrollIntoView">
                    * Password cannot be empty
                  </span>
                ) : (
                  <span className="error"></span>
                )}
                {errorFromFirebse === "auth/user-not-found" ? (
                  <span className="firebase__error" id="scrollIntoView">
                    * User not Registered
                  </span>
                ) : errorFromFirebse.length !== 0 ? (
                  <span className="firebase__error" id="scrollIntoView">
                    * Email / Password is Wrong
                  </span>
                ) : (
                  <span className="firebase__error"></span>
                )}
                <button className="login__btn" onClick={login}>
                  Admin Login
                </button>
                <div className="not__registered">
                  <span>Don't have an Account?</span>
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
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
export default Login;
