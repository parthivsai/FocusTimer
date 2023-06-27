import React from "react";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

import "./AddTodo.css";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleSave = () => {
    console.log("in AddTodos and the adding value is : " + todo);
    props.handleTodo(todo);
    props.handlePopup(false);
  };

  const handleClose = () => {
    props.handlePopup(false);
  };

  return (
    <div className="popup">
      <div className="popupContent">
        <input
          type="text"
          placeholder=" What are you up to?"
          onChange={handleChange}
          className="textInput"
        />
        <div className="PopupTopSecondLayer">
          <h6 class="headingtext">Pomos</h6>
          <input
            type="number"
            placeholder="0"
            min="0"
            max="1000"
            className="NumberInput"
          />
        </div>
      </div>
      <div className="popupFooter">
        <div className="Buttons">
          <button className="btn btn-light closeButton" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-dark saveButton" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
