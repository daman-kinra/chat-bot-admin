import React, { useLayoutEffect, useState } from "react";
import "./mainarea.css";
import Sidebar from "../Sidebar/Sidebar";
import app from "../../firebase/firebase";
function Mainarea() {
  const [showAllQues, setShowAllQues] = useState(true);
  const [allQues, setAllQues] = useState([]);
  const [askedQues, setAskedques] = useState([]);
  const [showQuesBox, setShowQuesBox] = useState("all");
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
              console.log(arr);
              setAskedques(arr);
            });
        }
      });
  }, []);
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
              <button
                className="login__btn"
                onClick={() => {
                  setShowQuesBox("com");
                }}
              >
                FREQUENTLY ASKED
              </button>
            </div>
            {showQuesBox === "all" ? (
              <div className="allques">
                {allQues.map((item, pos) => {
                  return (
                    <div className="singleQues" key={pos}>
                      {item.Q}
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
            )}
            {showQuesBox === "com" ? (
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
            )}
          </div>
        </div>
      ) : (
        <div>Add Ques</div>
      )}
    </div>
  );
}

export default Mainarea;
