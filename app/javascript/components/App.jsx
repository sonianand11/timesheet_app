import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Timesheet from "../components/Timesheet";
import "antd/dist/antd.css";

const App = () => {
  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/timesheets" exact component={Home} />
      <Route path={`/timesheets/:id`} exact component={Timesheet} />
    </Switch>
  )
}


export default App