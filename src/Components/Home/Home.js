import { useState, useEffect } from "react";

// using react-dom createPortal for Settings Page and Task Finished Page
import { createPortal } from "react-dom";

// importing v4 from uuid for generating unique ids
import { v4 } from "uuid";

// importing required icons
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { AiFillStepForward } from "react-icons/ai";

import AddTodo from "../AddTodo/AddTodo";
import Settings from "../Settings/Settings";
import TasksFinished from "../TasksFinished/TasksFinished";

import "./Home.css";

const Home = () => {
  // States for Add and Settings popup
  const [showPopup, setShowPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Initializing default state values for required states
  const [focusButton, setFocusButton] = useState("Clicked");
  const [shortButton, setShortButton] = useState("default");
  const [longButton, setLongButton] = useState("default");
  const [startButton, setStartButton] = useState("FocusStart");
  const [addButton, setAddButton] = useState("FocusAdd");
  const [backgroundColor, setBackgroundColor] = useState("FocusBackground");

  const [displayMinutes, setDisplayMinutes] = useState("25");
  const [displaySeconds, setDisplaySeconds] = useState("00");

  // Maintaining isRunning state for all the three scenarios
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const [isLongRunning, setIsLongRunning] = useState(false);

  const [text, setText] = useState("Time to focus!");
  const [buttonText, setButtonText] = useState("Start");

  const [Todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentPomValue, setCurrentPomValue] = useState(0);
  const [roundText, setRoundText] = useState(1);
  const [pomoText, setPomoText] = useState(0);

  // State for checking if all tasks are done
  const [finishedTasks, setFinishedTasks] = useState(false);

  // State for holding finished Todo's
  const [finishedTodos, setFinishedTodos] = useState([]);

  // Settings State values
  const [autoPomo, setAutoPomo] = useState(true);
  const [autoBreak, setAutoBreak] = useState(true);
  const [focusLength, setFocusLength] = useState(25);
  const [shortLength, setShortLength] = useState(5);
  const [longLength, setLongLength] = useState(15);

  // Adding new Todos which are coming from AddTodo component
  const handleTodo = (todo, value) => {
    if (!Todos.includes({ name: todo, value: value })) {
      setTodos((prev) => [...prev, { id: v4(), name: todo, value: value }]);
    }
  };

  // handling the Settings popup
  const handlePopup = (flag) => {
    setShowPopup(flag);
  };

  // Focus, Short, Long  button's click functionalities
  const handleFocusClick = () => {
    setIsShortRunning(false);
    setIsLongRunning(false);
    setDisplaySeconds("00");
    setDisplayMinutes(focusLength.toString());
    if (backgroundColor !== "FocusBackground") {
      setBackgroundColor("FocusBackground");
      setText("Time to focus!");
      setButtonText("Start");
      setFocusButton("Clicked");
      setShortButton("default");
      setLongButton("default");
      setStartButton("FocusStart");
      setAddButton("FocusAdd");
    }
  };

  const handleShortClick = () => {
    setIsFocusRunning(false);
    setIsLongRunning(false);
    if (backgroundColor !== "ShortBackground") {
      setDisplayMinutes(shortLength.toString());
      setDisplaySeconds("00");
      setButtonText("Start");
      setBackgroundColor("ShortBackground");
      setText("Time for a short break!");
      setShortButton("Clicked");
      setFocusButton("default");
      setLongButton("default");
      setStartButton("ShortStart");
      setAddButton("ShortAdd");
    }
  };

  const handleLongClick = () => {
    setIsFocusRunning(false);
    setIsShortRunning(false);
    if (backgroundColor !== "LongBackground") {
      setDisplayMinutes(longLength.toString());
      setDisplaySeconds("00");
      setButtonText("Start");
      setBackgroundColor("LongBackground");
      setText("Time for a break!");
      setLongButton("Clicked");
      setFocusButton("default");
      setShortButton("default");
      setStartButton("LongStart");
      setAddButton("LongAdd");
    }
  };

  // Time changing functionality while focus timer is running
  useEffect(() => {
    let timer;
    if (isFocusRunning) {
      let minutes = parseInt(displayMinutes, 10);
      let seconds = parseInt(displaySeconds, 10);
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (roundText === 4) {
              handleLongClick();
              setAddButton("LongAdd");
              if (autoBreak) {
                setIsLongRunning(true);
                setButtonText("Pause");
              }
              return;
            }
            handleShortClick();
            setAddButton("ShortAdd");
            if (autoBreak) {
              setIsShortRunning(true);
              setButtonText("Pause");
            }
            return;
          }
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        // Adding "0" before the single digit for single digit numbers
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        // Setting the final values in respective states after every second
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isFocusRunning]);

  // Time changing functionality while short timer is running
  useEffect(() => {
    let timer;
    if (isShortRunning) {
      let minutes = parseInt(displayMinutes, 10);
      let seconds = parseInt(displaySeconds, 10);
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setRoundText((prev) => prev + 1);
            handleFocusClick();
            setIsFocusRunning(true);
            setAddButton("FocusAdd");
            setButtonText("Pause");
            return;
          }
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        // Adding "0" before the single digit for single digit numbers
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        // Setting the final values in respective states after every second
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isShortRunning]);

  // Time changing functionality while long timer is running
  useEffect(() => {
    let timer;
    let minutes = parseInt(displayMinutes, 10);
    let seconds = parseInt(displaySeconds, 10);
    if (isLongRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleFocusClick();
            setAddButton("FocusAdd");
            setRoundText(1);
            if (autoPomo) {
              setIsFocusRunning(true);
              setButtonText("Pause");
            }
            // Checking if the set amount of pomo's is reached or not, if reached change it to next to do, else increase the pomocount
            if (pomoText < currentPomValue - 1) {
              setPomoText((prev) => prev + 1);
              setRoundText(1);
            } else {
              let index = Todos.indexOf(currentTodo);
              setFinishedTodos((prev) => [...prev, Todos[index]]);

              // checking if this is the last todo or not and executing accordingly
              if (index === Todos.length - 1) {
                setFinishedTasks(true);
              } else {
                setCurrentTodo(Todos[index + 1]);
                setCurrentPomValue(currentTodo.value);
                setRoundText(1);
                setPomoText(0);
              }
            }
            return;
          }
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        // Adding "0" before the single digit for single digit numbers
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        // Setting the final values in respective states after every second
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isLongRunning]);

  const handleStart = () => {
    // changing isRunning state on clicking "Start" or "Pause" button
    if (buttonText === "Pause") {
      setButtonText("Start");
      if (startButton === "FocusStart") {
        setIsFocusRunning(false);
      } else if (startButton === "ShortStart") {
        setIsShortRunning(false);
      } else {
        setIsLongRunning(false);
      }
      return;
    } else {
      // checking if a particular Todo is selected or not
      if (currentTodo === "") {
        {
          setText("Select a Todo to work on!!");
          return;
        }
      }
      setButtonText("Pause");
      if (startButton === "FocusStart") {
        setIsFocusRunning(true);
        return;
      } else if (startButton === "ShortStart") {
        setIsShortRunning(true);
      } else {
        setIsLongRunning(true);
      }
      return;
    }
  };

  // Skip button functionality
  const handleNext = () => {
    if (backgroundColor === "FocusBackground") {
      // Focus Scenario
      if (roundText === 4) {
        handleLongClick();
        return;
      }
      handleShortClick();
    } else if (backgroundColor === "ShortBackground") {
      // Short Scenario
      setRoundText((prev) => prev + 1);
      handleFocusClick();
    } else {
      // Long Scenario
      handleFocusClick();
      // if current pomodoro count is less than the given total count
      if (pomoText < currentPomValue - 1) {
        setPomoText((prev) => prev + 1);
        setRoundText(1);
      } else {
        // if this is the last pomodoro of the last Todo then displaying TasksFinished page
        let index = Todos.indexOf(currentTodo);
        setFinishedTodos((prev) => [...prev, Todos[index]]);
        if (index === Todos.length - 1) {
          setPomoText((prev) => prev + 1);
          setFinishedTasks(true);
        } else {
          // if there are some Todo's left
          setCurrentTodo(Todos[index + 1]);
          setCurrentPomValue(currentTodo.value);
          setPomoText(0);
          setRoundText(1);
        }
      }
    }
  };

  // Selecting a Todo functionality
  const handleTodoClick = (todo) => {
    setCurrentTodo(todo);
    setCurrentPomValue(todo.value);
    setText("Time to focus!");
    setRoundText(1);
  };

  // Save click functionality
  const handleSave = (
    focusLength,
    shortLength,
    longLength,
    autoPomo,
    autoBreak
  ) => {
    setFocusLength(focusLength);
    setShortLength(shortLength);
    setLongLength(longLength);
    setAutoPomo(autoPomo);
    setAutoBreak(autoBreak);
    console.log(focusLength, shortLength, longLength, autoPomo, autoBreak);
    if (backgroundColor === "FocusBackground") {
      setDisplayMinutes(focusLength);
    } else if (backgroundColor === "ShortBackground") {
      setDisplayMinutes(shortLength);
    } else {
      setDisplayMinutes(longLength);
    }
  };

  // Deleting a Todo functionality
  const handleDelete = (id) => {
    const temp = Todos.filter((todo) => todo.id !== id);
    setTodos(temp);
  };

  // Clicking on the overlay of the AllTasksFinished Page for resetting the FocusTimer
  const handleResetClick = (flag) => {
    // Changing all the states to their default values
    if (flag) {
      setText("Time to focus!");
      setButtonText("Start");
      setTodos([]);
      setCurrentTodo("");
      setCurrentPomValue(0);
      setRoundText(1);
      setPomoText(0);
      setFinishedTasks(false);
      setFinishedTodos([]);
    }
  };

  // For mobile design
  // useEffect(()=>{
  //   if(window.innerWidth<"720px"){}
  // },[window.innerWidth])

  return (
    <div className={backgroundColor}>
      <div className="outerContainer">
        {/* All Tasks Finished Page */}
        {finishedTasks && <TasksFinished handleResetClick={handleResetClick} />}

        {/* Title and Settings Section */}
        <div className="TopContainer">
          <div>
            <h4>
              <BsFillCheckCircleFill /> FocusTimer
            </h4>
          </div>
          <div>
            <button
              className="settingsButton"
              onClick={() => setShowSettings(true)}
            >
              <IoIosSettings /> Settings
            </button>
            <div className="portaldiv">
              {showSettings &&
                createPortal(
                  <Settings
                    handleSave={handleSave}
                    focusLength={focusLength}
                    shortLength={shortLength}
                    longLength={longLength}
                    autoBreak={autoBreak}
                    autoPomo={autoPomo}
                    onClose={() => setShowSettings(false)}
                  />,
                  document.getElementById("root")
                )}
            </div>
          </div>
        </div>
        <hr />
        {/* Timer Section */}
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
              <h1 className="Time">
                {displayMinutes}:{displaySeconds}
              </h1>
            </div>
            <div className="">{text}</div>
            <div>
              <button className={startButton} onClick={handleStart}>
                {buttonText}
              </button>
              <button className="nextButton" onClick={handleNext}>
                <AiFillStepForward />
              </button>
            </div>
            {currentTodo.name && (
              <div className="currentTodo">
                <p className="roundText">#{roundText}</p>
                <h6 className="roundTodoText">
                  {currentTodo.name} ({pomoText}/{currentPomValue})
                </h6>
              </div>
            )}
          </div>
          <hr />

          {/* Todo's Section */}
          <div>
            <h2>ToDo's</h2>

            <div className="todos">
              {finishedTodos &&
                finishedTodos.map((todo) => (
                  <div key={todo.id} className="finishedTodo">
                    {" "}
                    <s>{todo.name}</s>{" "}
                  </div>
                ))}

              {Todos &&
                Todos.map(
                  (todo) =>
                    !finishedTodos.includes(todo) && (
                      <div key={todo.id} className="todosParent">
                        <div
                          className="todo"
                          onClick={() => handleTodoClick(todo)}
                        >
                          {" "}
                          {todo.name}{" "}
                        </div>
                        <div>
                          {" "}
                          <button
                            className="deleteButton"
                            onClick={() => handleDelete(todo.id)}
                          >
                            {" "}
                            x{" "}
                          </button>
                        </div>
                      </div>
                    )
                )}
            </div>
            {/* Add Todo Section */}
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
      </div>
    </div>
  );
};

export default Home;
