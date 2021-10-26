import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "../components/Home";
import Timesheet from "../components/Timesheet";

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