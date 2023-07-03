import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { createPortal } from "react-dom";
import { useState } from "react";
import "./Settings.css";

const Settings = (props) => {
  const [autoPomo, setAutoPomo] = useState(false);
  const [autoBreak, setAutoBreak] = useState(false);
  const [focusLength, setFocusLength] = useState(25);
  const [shortLength, setShortLength] = useState(5);
  const [longLength, setLongLength] = useState(15);

  const handleAutoPomo = () => {
    setAutoPomo((prev) => !prev);
    console.log("Autopomo changed to : " + autoPomo);
  };

  const handleAutoBreak = () => {
    setAutoBreak((prev) => !prev);
    console.log("AutoBreak changed to : " + autoBreak);
  };

  const handleFocusLength = (event) => {
    setFocusLength(event.target.value);
  };

  const handleShortLength = (event) => {
    setShortLength(event.target.value);
  };
  const handleLongLength = (event) => {
    setLongLength(event.target.value);
  };

  const handleSave = () => {
    props.handleSave(focusLength, shortLength, longLength, autoPomo, autoBreak);
    props.onClose();
  };
  return createPortal(
    <>
      <div className="overLay" />
      <div className="card">
        <div className="card-head">
          <p className="settingsText">Settings</p>
          <button
            className="btn btn-danger closeButton"
            onClick={props.onClose}
          >
            x
          </button>
        </div>
        <div className="card-body">
          <div className="TopSection">
            <p>Time(minutes)</p>
            <div className="InputContainer">
              <div className="FocusInput">
                Focus{" "}
                <input
                  type="number"
                  min="25"
                  max="45"
                  defaultValue="25"
                  className="inputField"
                  onChange={handleFocusLength}
                />
              </div>
              <div>
                ShortBreak{" "}
                <input
                  type="number"
                  min="5"
                  max="15"
                  defaultValue="5"
                  className="inputField"
                  onChange={handleShortLength}
                />
              </div>
              <div>
                LongBreak{" "}
                <input
                  type="number"
                  min="15"
                  max="30"
                  defaultValue="15"
                  className="inputField"
                  onChange={handleLongLength}
                />
              </div>
            </div>
            <div className="toggleSwitches">
              <ToggleSwitch
                label="Auto Start Pomos"
                isChecked={handleAutoPomo}
              />
              <ToggleSwitch
                label="Auto Start Breaks"
                isChecked={handleAutoBreak}
              />
            </div>
          </div>
          <hr />
          <div className="BottomSection">
            <button className="btn btn-dark saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};
export default Settings;
