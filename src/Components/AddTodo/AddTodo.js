import React from "react";
import { useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";

import "./AddTodo.css";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleNumberChange = (event) => {
    setValue(event.target.value);
  };

  const handleSave = () => {
    console.log("in AddTodos and the adding value is : " + todo);
    props.handleTodo(todo, value);
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
          <h6 className="headingtext">Pomos</h6>
          <input
            type="number"
            placeholder="0"
            min="0"
            max="1000"
            className="NumberInput"
            onChange={handleNumberChange}
          />
        </div>
      </div>
      <div className="popupFooter">
        <div className="Buttons">
          <button className="btn btn-light csButton" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-dark" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
