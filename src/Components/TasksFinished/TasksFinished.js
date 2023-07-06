import React, { useEffect, useState } from "react";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
import { createPortal } from "react-dom";
import Confetti from "react-confetti";
import "./TasksFinished.css";

const TasksFinished = (props) => {
  const [displayConfetti, setDisplayConfetti] = useState(true);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  const handleWindowSize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.onresize = () => handleWindowSize;
    const timer = setTimeout(() => {
      setDisplayConfetti(false);
    }, 10000);
    return () => clearTimeout(timer);
  });

  return createPortal(
    <>
      <div className="overLay" onClick={() => props.handleResetClick(true)} />
      {displayConfetti && (
        <Confetti
          className="Confetti"
          width={windowSize.width}
          height={windowSize.height}
        />
      )}
      <div className="card task">
        <div className="header">
          <h5 className="headingText">All Tasks Finished</h5>
        </div>
        <div className="body">
          <p>Hurray!! You finished up all the tasks.</p>
          <p> It's time to have some fun!</p>
        </div>
        <hr />
        <div className="footer">
          <h5> Made by Parthiv </h5>
          <div className="Links">
            <a
              className="github"
              href="https://github.com/parthivsai?tab=repositories"
              target="_blank"
            >
              <AiOutlineGithub color="black" size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/parthivsai"
              target="_blank"
              className="linkedIn"
            >
              <AiFillLinkedin color="black" size={20} />
            </a>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

export default TasksFinished;
