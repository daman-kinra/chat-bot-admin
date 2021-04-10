import React from "react";
import "./sidebar.css";
function Sidebar(props) {
  return (
    <div className="main__head">
      <button
        className="login__btn"
        onClick={() => {
          props.setQues(true);
        }}
      >
        All Questions
      </button>
      <button
        className="login__btn"
        onClick={() => {
          props.setQues(false);
        }}
      >
        Add Questions
      </button>
    </div>
  );
}

export default Sidebar;
