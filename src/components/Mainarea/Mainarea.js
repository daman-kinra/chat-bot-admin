import React, { useLayoutEffect, useState } from "react";
import "./mainarea.css";
import Sidebar from "../Sidebar/Sidebar";
import app from "../../firebase/firebase";
function Mainarea() {
  const [showAllQues, setShowAllQues] = useState(true);
  const [allQues, setAllQues] = useState([]);
  const [askedQues, setAskedques] = useState([]);
  const [showQuesBox, setShowQuesBox] = useState("all");
  const [newQues, setNewQues] = useState("");
  const [newAns, setNewAns] = useState("");
  const [error, setError] = useState("");
  const setQues = (isVissible) => {
    setShowAllQues(isVissible);
  };
  useLayoutEffect(() => {
    app
      .firestore()
      .collection("Questions")
      .doc("Q&A")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setAllQues(doc.data().data);
          app
            .firestore()
            .collection("Not-Found-Questions")
            .onSnapshot((item) => {
              let arr = [];
              item.forEach((doc) => {
                arr.push(doc.data());
              });

              setAskedques(arr);
            });
        }
      });
  }, []);

  const addNewQuestion = (e) => {
    e.preventDefault();
    if (newQues === "") {
      setError("newQues");
      return;
    }
    if (newAns === "") {
      setError("newAns");
      return;
    }
    const newArr = [...allQues, { Q: newQues, A: newAns }];
    setAllQues(newArr);
    app
      .firestore()
      .collection("Questions")
      .doc("Q&A")
      .set({ data: newArr })
      .then(() => {
        // console.log("done");
        setNewQues("");
        setNewAns("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteOneQues = (e, pos) => {
    let tempArr = allQues;
    delete tempArr[pos];
    const newArr = tempArr.filter((item) => item !== undefined);
    setAllQues(newArr);
    app
      .firestore()
      .collection("Questions")
      .doc("Q&A")
      .set({ data: newArr })
      .then(() => {
        // console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="mainarea">
      <Sidebar setQues={setQues} />
      {showAllQues ? (
        <div className="allques__div">
          <div className="question__area">
            <div className="asked__toggle">
              <button
                className="login__btn"
                onClick={() => {
                  setShowQuesBox("all");
                }}
              >
                ALL
              </button>
              <button
                className="login__btn"
                onClick={() => {
                  setShowQuesBox("ask");
                }}
              >
                ASKED
              </button>
              {/* <button
                className="login__btn"
                onClick={() => {
                  setShowQuesBox("com");
                }}
              >
                FREQUENTLY ASKED
              </button> */}
            </div>
            {showQuesBox === "all" ? (
              <div className="allques">
                {allQues.map((item, pos) => {
                  return (
                    <div className="singleQues" key={pos}>
                      <p>{item.Q}</p>
                      <button
                        className="delete__btn"
                        onClick={(e) => {
                          deleteOneQues(e, pos);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {showQuesBox === "ask" ? (
              <div className="allques">
                {askedQues.map((item, pos) => {
                  return (
                    <div className="singleQues" key={pos}>
                      <h5>By: {item.email}</h5>
                      {item.question.map((ques, pos) => {
                        return <p key={pos}>{ques}</p>;
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {/* {showQuesBox === "com" ? (
              <div className="allques">
                {askedQues.map((item, pos) => {
                  return (
                    <div className="singleQues" key={pos}>
                      {item.email}
                      {item.question.map((ques, pos) => {
                        return <p key={pos}>{ques}</p>;
                      })}
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>
      ) : (
        <div className="allques__div">
          <div className="login__box addQues__div">
            <form action="">
              <label htmlFor="email">Question:</label>
              <input
                type="text"
                className="input"
                placeholder="Question"
                id="email"
                value={newQues}
                onChange={(e) => {
                  setError("");
                  setNewQues(e.target.value);
                }}
              />
              {error !== "newQues" ? (
                <span className="error"></span>
              ) : (
                <span className="error" id="scrollIntoView">
                  * Enter question first
                </span>
              )}

              <label htmlFor="pass">Answer:</label>
              <input
                type="text"
                className="input"
                placeholder="Answer"
                id="pass"
                value={newAns}
                onChange={(e) => {
                  setNewAns(e.target.value);
                  setError("");
                }}
              />
              {error !== "newAns" ? (
                <span className="error"></span>
              ) : (
                <span className="error" id="scrollIntoView">
                  * Enter answer first
                </span>
              )}
              <button className="login__btn" onClick={addNewQuestion}>
                ADD
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainarea;
