import "./Home.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
// import { HiDocumentReport } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { AiFillStepForward } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTodo from "../AddTodo/AddTodo";
import Settings from "../Settings/Settings";

const Home = () => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [focusButton, setFocusButton] = useState("Clicked");
  const [shortButton, setShortButton] = useState("default");
  const [longButton, setLongButton] = useState("default");

  const [startButton, setStartButton] = useState("FocusStart");
  const [addButton, setAddButton] = useState("FocusAdd");

  const [backgroundColor, setBackgroundColor] = useState("FocusBackground");

  const [displayMinutes, setDisplayMinutes] = useState("25");
  const [displaySeconds, setDisplaySeconds] = useState("00");

  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [isShortRunning, setIsShortRunning] = useState(false);
  const [isLongRunning, setIsLongRunning] = useState(false);

  const [text, setText] = useState("Time to focus!");

  const [buttonText, setButtonText] = useState("Start");

  let todoList = ["Work on the project"];
  let valueList = [2];
  let time = { Focus: "25", Short: "5", Long: "15" };

  const [Todos, setTodos] = useState(todoList);
  const [pomValues, setPomValues] = useState(valueList);
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentPomValue, setCurrentPomValue] = useState(0);
  const [roundText, setRoundText] = useState(1);
  const [pomoText, setPomoText] = useState(0);

  const [finishedTodos, setFinishedTodos] = useState([]);

  // Settings State values
  const [autoPomo, setAutoPomo] = useState(true);
  const [autoBreak, setAutoBreak] = useState(true);
  const [focusLength, setFocusLength] = useState(25);
  const [shortLength, setShortLength] = useState(5);
  const [longLength, setLongLength] = useState(15);

  const handleTodo = (todo, value) => {
    if (!Todos.includes(todo)) {
      setTodos((prev) => [...prev, todo]);
      setPomValues((prev) => [...prev, value]);
    }
  };

  const handlePopup = (flag) => {
    console.log("In Home and the popup value is: " + flag);
    setShowPopup(flag);
  };

  const handleFocusClick = () => {
    setIsShortRunning(false);
    setIsLongRunning(false);
    setDisplaySeconds("00");
    setDisplayMinutes(focusLength.toString());
    console.log("In handleFocusClick()");
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
              setIsLongRunning(true);
              setAddButton("Pause");
              return;
            }
            handleShortClick();
            setIsShortRunning(true);
            setAddButton("Pause");
            return;
          }
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        console.log("minutes: " + minutes, "Seconds: " + seconds);
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isFocusRunning]);

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
            setAddButton("Pause");
            return;
          }
          // change seconds to 00 and reduce minutes by 1
          minutes -= 1;
          seconds = 59;
        } else {
          seconds -= 1;
        }
        console.log("minutes: " + minutes, "Seconds: " + seconds);
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isShortRunning]);

  useEffect(() => {
    let timer;
    let minutes = parseInt(displayMinutes, 10);
    let seconds = parseInt(displaySeconds, 10);
    if (isLongRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleFocusClick();
            setRoundText(1);
            setIsFocusRunning(true);
            setAddButton("Pause");
            // Checking if the set amount of pomo's is reached or not, if reached change it to next to do, else increase the pomocount
            if (pomoText < currentPomValue - 1) {
              setPomoText((prev) => prev + 1);
              setRoundText(1);
            } else {
              let index = Todos.indexOf(currentTodo);
              setFinishedTodos((prev) => [...prev, Todos[index]]);

              // checking if this is the last todo or not and executing accordingly
              if (index === Todos.length - 1) {
                window.alert(
                  "Hurray, All tasks are finished. Go have some fun!!"
                );
              } else {
                setCurrentTodo(Todos[index + 1]);
                setCurrentPomValue(pomValues[index + 1]);
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
        console.log("minutes: " + minutes, "Seconds: " + seconds);
        let minString = minutes.toString();
        if (minString.length === 1) {
          minString = "0" + minString;
        }
        let secString = seconds.toString();
        if (secString.length === 1) {
          secString = "0" + secString;
        }
        setDisplayMinutes(minString);
        setDisplaySeconds(secString);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isLongRunning]);

  const handleStart = () => {
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

  const handleNext = () => {
    if (backgroundColor === "FocusBackground") {
      if (roundText === 4) {
        handleLongClick();
        return;
      }
      handleShortClick();
    } else if (backgroundColor === "ShortBackground") {
      setRoundText((prev) => prev + 1);
      handleFocusClick();
    } else {
      handleFocusClick();
      if (pomoText < currentPomValue - 1) {
        setPomoText((prev) => prev + 1);
        setRoundText(1);
      } else {
        let index = Todos.indexOf(currentTodo);
        setFinishedTodos((prev) => [...prev, Todos[index]]);
        if (index === Todos.length - 1) {
          setPomoText((prev) => prev + 1);
          window.alert("Hurray, All tasks are finished. Go have some fun!!");
        } else {
          setCurrentTodo(Todos[index + 1]);
          setCurrentPomValue(pomValues[index + 1]);
          setPomoText(0);
          setRoundText(1);
        }
      }
    }
  };

  const handleTodoClick = (todo, index) => {
    setCurrentTodo(todo);
    setCurrentPomValue(pomValues[index]);
    setText("Time to focus!");
    setRoundText(1);
  };

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
    setAutoPomo(!autoPomo);
    setAutoBreak(!autoBreak);
    console.log(focusLength, shortLength, longLength, autoPomo, autoBreak);
    if (backgroundColor === "FocusBackground") {
      setDisplayMinutes(focusLength);
    } else if (backgroundColor === "ShortBackground") {
      setDisplayMinutes(shortLength);
    } else {
      setDisplayMinutes(longLength);
    }
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
            {/* <button className="reportButton">
              <HiDocumentReport /> Report
            </button> */}
            <button
              className="settingsButton"
              onClick={() => setShowSettings(true)}
            >
              <IoIosSettings /> Settings
            </button>
            {showSettings && (
              <Settings
                handleSave={handleSave}
                onClose={() => setShowSettings(false)}
              />
            )}
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
            {currentTodo !== "" && (
              <div className="currentTodo">
                <p className="roundText">#{roundText}</p>
                <h6 className="roundTodoText">
                  {currentTodo} ({pomoText}/{currentPomValue})
                </h6>
              </div>
            )}
          </div>
          <hr />
          <div>
            <h2>ToDo's</h2>

            <div className="todos">
              {finishedTodos &&
                finishedTodos.map((todo, index) => (
                  <div
                    key={index}
                    className="finishedTodo"
                    onClick={() => handleTodoClick(todo, index)}
                  >
                    {" "}
                    <s>{todo}</s>{" "}
                  </div>
                ))}
              {Todos &&
                Todos.map(
                  (todo, index) =>
                    !finishedTodos.includes(todo) && (
                      <div
                        key={index}
                        className="todo"
                        onClick={() => handleTodoClick(todo, index)}
                      >
                        {" "}
                        {todo}{" "}
                      </div>
                    )
                )}
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
