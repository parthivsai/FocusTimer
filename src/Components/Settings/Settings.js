import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState } from "react";
import "./Settings.css";

const Settings = (props) => {
  // States for all the required fields
  const [autoPomo, setAutoPomo] = useState(props.autoPomo);
  const [autoBreak, setAutoBreak] = useState(props.autoBreak);
  const [focusLength, setFocusLength] = useState(props.focusLength);
  const [shortLength, setShortLength] = useState(props.shortLength);
  const [longLength, setLongLength] = useState(props.longLength);

  // handling field changes
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

  // handling save click and popup closing functionality
  const handleSave = () => {
    props.handleSave(focusLength, shortLength, longLength, autoPomo, autoBreak);
    props.onClose();
  };

  return (
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
                  defaultValue={focusLength}
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
                  defaultValue={shortLength}
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
                  defaultValue={longLength}
                  className="inputField"
                  onChange={handleLongLength}
                />
              </div>
            </div>
            <div className="toggleSwitches">
              <ToggleSwitch
                label="Auto Start Pomos"
                defaultValue={autoPomo}
                isChecked={handleAutoPomo}
              />
              <ToggleSwitch
                label="Auto Start Breaks"
                defaultValue={autoBreak}
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
    </>
  );
};

export default Settings;
