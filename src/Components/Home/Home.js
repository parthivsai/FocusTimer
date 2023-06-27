import "./Home.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  const [focusButton, setFocusButton] = useState("Clicked");
  const [shortButton, setShortButton] = useState("default");
  const [longButton, setLongButton] = useState("default");

  const [startButton, setStartButton] = useState("FocusStart");
  const [addButton, setAddButton] = useState("FocusStart");

  const [backgroundColor, setBackgroundColor] = useState("FocusBackground");

  const [displayTime, setDisplayTime] = useState(25);

  const [text, setText] = useState("Time to focus!");
  let todoList = ["Work on the project"];
  let time = { Focus: 25, Short: 5, Long: 15 };

  const [Todos, setTodos] = useState(todoList);
  console.log(Todos);

  const handleTodo = (todo) => {
    console.log("In home and the todo value is: " + todo);
    if (!Todos.includes(todo)) {
      setTodos((prev) => [...prev, todo]);
    }
  };

  const handlePopup = (flag) => {
    console.log("In Home and the popup value is: " + flag);
    setShowPopup(flag);
  };

  const handleFocusClick = () => {
    setDisplayTime(time.Focus);
    setBackgroundColor("FocusBackground");
    setText("Time to focus!");
    setFocusButton("Clicked");
    setShortButton("default");
    setLongButton("default");
    setStartButton("FocusStart");
    setAddButton("FocusAdd");
  };

  const handleShortClick = () => {
    setDisplayTime(time.Short);
    setBackgroundColor("ShortBackground");
    setText("Time for a break!");
    setShortButton("Clicked");
    setFocusButton("default");
    setLongButton("default");
    setStartButton("ShortStart");
    setAddButton("ShortAdd");
  };

  const handleLongClick = () => {
    setDisplayTime(time.Long);
    setBackgroundColor("LongBackground");
    setText("Time for a break!");
    setLongButton("Clicked");
    setFocusButton("default");
    setShortButton("default");
    setStartButton("LongStart");
    setAddButton("LongAdd");
  };

  return (
    <div className={backgroundColor}>
      <div className="outerContainer">
        <div className="TopContainer">
          <div>
            <h4>
              <BsFillCheckCircleFill /> FocusTimer
            </h4>
          </div>
          <div>
            <button className="reportButton">
              <HiDocumentReport /> Report
            </button>
            <button className="settingsButton">
              <IoIosSettings /> Settings
            </button>
          </div>
        </div>
        <hr />
        <div className="middleContainer">
          <div className="middleTop">
            <div className="TimerDisplay">
              <div className="FocusOptions">
                <button className={focusButton} onClick={handleFocusClick}>
                  Focus
                </button>
                <button className={shortButton} onClick={handleShortClick}>
                  Short Break
                </button>
                <button className={longButton} onClick={handleLongClick}>
                  Long Break
                </button>
              </div>
              <h1 className="Time">{displayTime}</h1>
            </div>
            <div className="">{text}</div>
            <div>
              <button className={startButton}>Start</button>
            </div>
          </div>
          <hr />
          <div>
            <h2>ToDo's</h2>

            <div className="todos">
              {Todos &&
                Todos.map((todo) => <div className="todo"> {todo} </div>)}
            </div>

            {showPopup && (
              <div className="displayPopup">
                <AddTodo handleTodo={handleTodo} handlePopup={handlePopup} />
              </div>
            )}
            <button className={addButton} onClick={() => setShowPopup(true)}>
              Add
            </button>
          </div>
        </div>
        <br />
        <div className="bottomContainer"></div>
      </div>
    </div>
  );
};

export default Home;
