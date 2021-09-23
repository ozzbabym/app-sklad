import "./App.css";
import React from "react";
import Registration from "./components/Registration/Registration";
import { reducer, initialState } from "./reducer/reducer";
import MainMenu from "./components/MainMenu/MainMenu";
import { Route, Switch} from "react-router-dom";


function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  

  return (
    <div className="App">
      <Switch>
        <Route
          path={"/"}
          render={() => <Registration dispatch={dispatch} state={state}/>}
          exact
        />
        <Route
          path={"/menu"}
          render={() => <MainMenu dispatch={dispatch} state={state} />}
          exact
        />
      </Switch>
    </div>
  );
}

export default App;
