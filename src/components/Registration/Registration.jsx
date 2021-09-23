import React from "react";
import styles from "./Registration.module.css";
import {Redirect} from 'react-router-dom'

function Registration({ dispatch, state }) {
  const [input, setInput] = React.useState({});

  if (state.auth) return <Redirect to={"/menu"}/>;

  const clickEntry = () => {
    dispatch({ type: "CHECK", payload: input });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                onChange={(e) => {
                  setInput({ ...input, login: e.currentTarget.value });
                }}
                type="text"
                className="form-control"
                id="staticEmail"
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              PSW
            </label>
            <div className="col-sm-10">
              <input
                onChange={(e) => {
                  setInput({ ...input, password: e.currentTarget.value });
                }}
                type="password"
                className="form-control"
                id="inputPassword"
              />
            </div>
          </div>
          <div className={styles.button}>
            <button className="btn btn-success">регистрироваться</button>
            <button onClick={() => clickEntry()} className="btn btn-primary">
              вход
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
