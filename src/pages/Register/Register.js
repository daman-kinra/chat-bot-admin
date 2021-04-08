import React, { useState, useEffect } from "react";
import app from "../../firebase/firebase";
import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";
import images from "../../images/leftpart_bg.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import "./register.css";
function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorFromFirebse, setErrorFromFirebse] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uid, setUID] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrm__password, setCnfrm__password] = useState("");
  const ref = app.firestore().collection("admin-access-request");
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const checkAndAdd = (email, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = ref.doc(email);
        const result = await app
          .firestore()
          .runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (doc.exists) {
              let err = {
                code: "AlreadyRegistered",
                message: "User is already registered.",
              };
              throw err;
            }
            transaction.set(docRef, data);
            return;
          });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  };
  const register = async (e) => {
    e.preventDefault();

    if (firstName === "") {
      setError("firstname");

      return;
    }
    if (lastName === "") {
      setError("lastname");

      return;
    }
    if (email === "") {
      setError("email");

      return;
    }
    if (!validateEmail(email.toLocaleLowerCase().trim())) {
      setError("invalid");

      return;
    }
    if (uid === "") {
      setError("uid");

      return;
    }
    if (password === "") {
      setError("password");

      return;
    }
    if (cnfrm__password === "") {
      setError("cnfrmpassword");

      return;
    }
    if (cnfrm__password !== password) {
      setError("doesnt match password");

      return;
    }
    setLoading(true);
    const data = {
      firstName,
      lastName,
      email,
      uid,
      password,
      cnfrm__password,
    };
    await checkAndAdd(email, data)
      .then(() => {
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setErrorFromFirebse("");
        setUID("");
        setCnfrm__password("");
        setPassword("");
        swal(
          "Request sent!",
          "We will mail you once your details get varified!",
          "success"
        );
      })
      .catch((err) => {
        setLoading(false);
        setErrorFromFirebse(err.code);
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
            <div className="registration__box">
              <div className="header">
                <h2>Register Yourself</h2>
              </div>
              <form action="">
                <div className="fullname">
                  <div className="firstName">
                    <label htmlFor="firstName">Firstname:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input"
                      placeholder="Firstname"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setError("");
                      }}
                    />
                    {error === "firstname" ? (
                      <span className="error" id="scrollIntoView">
                        * Enter your firstname
                      </span>
                    ) : (
                      <span className="error"></span>
                    )}
                  </div>
                  <div className="lastName">
                    <label htmlFor="lastName">Lastname:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input"
                      placeholder="Lastname"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setError("");
                      }}
                    />
                    {error === "lastname" ? (
                      <span className="error" id="scrollIntoView">
                        * Enter your lastname
                      </span>
                    ) : (
                      <span className="error"></span>
                    )}
                  </div>
                </div>
                <div className="email">
                  <label htmlFor="email">E-mail ID:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="E-mail ID"
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
                </div>
                <div className="uid">
                  <label htmlFor="uid">UID:</label>
                  <input
                    type="text"
                    id="uid"
                    name="uid"
                    className="input"
                    placeholder="UID"
                    value={uid}
                    onChange={(e) => {
                      setUID(e.target.value);
                      setError("");
                    }}
                  />
                  {error === "uid" ? (
                    <span className="error" id="scrollIntoView">
                      * Enter your UID
                    </span>
                  ) : (
                    <span className="error"></span>
                  )}
                </div>
                <div className="password">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                  {error === "password" ? (
                    <span className="error" id="scrollIntoView">
                      * Enter your Password
                    </span>
                  ) : (
                    <span className="error"></span>
                  )}
                </div>
                <div className="cnfrm__password">
                  <label htmlFor="cnfrmpassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="cnfrmpassword"
                    name="cnfrmpassword"
                    className="input"
                    placeholder="Confirm Password"
                    value={cnfrm__password}
                    onChange={(e) => {
                      setCnfrm__password(e.target.value);
                      setError("");
                    }}
                  />
                  {error === "cnfrmpassword" ? (
                    <span className="error" id="scrollIntoView">
                      * Password cannot be empty
                    </span>
                  ) : error === "doesnt match password" ? (
                    <span className="error">
                      * Password and Confirm Password did not match
                    </span>
                  ) : (
                    <span className="error"></span>
                  )}
                </div>
                {errorFromFirebse === "AlreadyRegistered" ? (
                  <span className="firebase__error" id="scrollIntoView">
                    * Already Requested
                  </span>
                ) : errorFromFirebse.length !== 0 ? (
                  <span className="firebase__error" id="scrollIntoView">
                    * Email / Password is Wrong
                  </span>
                ) : (
                  <span className="firebase__error"></span>
                )}
                <button className="login__btn" onClick={register}>
                  Register
                </button>
                <div className="not__registered">
                  <span>Already have an Account?</span>
                  <Link to="/">Login</Link>
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
export default Register;
