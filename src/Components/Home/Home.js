import "./Home.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  var [showPopup, setShowPopup] = useState(true);
  console.log(showPopup);

  const text = "Enjoy your session";
  let todoList = ["Work on the project", "Go to gym"];
  const [Todos, setTodos] = useState(todoList);
  console.log(Todos);

  return (
    <div className="backgroundColor">
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
          <div className="TimerDisplay">
            <div className="FocusOptions">
              <button className="Focus">Focus</button>
              <button className="shortBreak">Short Break</button>
              <button className="longBreak">Long Break</button>
            </div>
            <h1 className="Time">5:00</h1>
          </div>
          <div className="">{text}</div>
          <div>
            <button className="start">Start</button>
          </div>
          <hr />
          <div>
            <h2>ToDo's</h2>

            <div className="todos">
              {Todos &&
                Todos.map((todo) => <div className="todo"> {todo} </div>)}
            </div>
            {showPopup && (
              <div className="popup">
                <div className="popupContent">
                  <input type="text" placeholder="what are you up to?" />
                  <input type="number" placeholder="0" />
                </div>
                <div className="popupFooter">
                  <button
                    className="btn btn-danger"
                    onClick={() => setShowPopup(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => setShowPopup(false)}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
            <button
              className="addButton"
              onClick={() => setShowPopup(!showPopup)}
            >
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
