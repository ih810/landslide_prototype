//React
import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

//Fixed component
import Navbar from "./Component/navBar";
import Login from "./Page/login";
import Drawer from "./Component/drawer";

//Component
import HomePage from "./Page/homepage";
import NewProject from "./Page/newProject";
import NewModelSetting from "./Page/newModelSetting";
import PreTrainList from "./Page/preTrainList";
import UploadInput from "./Page/uploadInput";
import ValidateInput from "./Page/validateInput";
import ViewPerformance from "./Page/viewPerformance";
import Viewresults from "./Page/viewResult";

export default function App(props) {

  return (
    <>
      <Route path="/login" component={Login} />
      <div>
        {/* <Login/> */}
        <div style={{ height: "76px" }}>
          <Navbar />
        </div>
          <Drawer />
        <div className="row">
          <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/new-project" component={NewProject} />
                <Route path="/train-new-model" component={NewModelSetting} />
                <Route path="/pre-train-model" component={PreTrainList} />
                <Route path="/upload-files" component={UploadInput} />
                <Route path="/validate-input" component={ValidateInput} />
                <Route path="/view-performance" component={ViewPerformance} />
                <Route path="/view-results" component={Viewresults} />
          </Switch>
        </div>
      </div>
    </>
  );
}
