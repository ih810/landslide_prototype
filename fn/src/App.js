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
import viewresults from "./Page/viewResult";
import HomePage from "./Page/homePage";
import NewProject from "./Page/newProject";
import NewModelSetting from "./Page/newModelSetting";
import UploadInput from "./Page/uploadInput";
import ValidateInput from "./Page/validateInput";
import PreTrainList from "./Page/preTrainList";

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
                    <Route path="/newproject" component={NewProject} />
                    <Route path="/trainnewmodel" component={NewModelSetting} />
                    <Route path="/pretrainmodel" component={PreTrainList} />
                    <Route path="/uploadFiles" component={UploadInput} />
                    <Route path="/validateInput" component={ValidateInput} />
                    <Route path="/viewresults" component={viewresults} />
              </Switch>
            </div>
          </div>
    </>
  );
}
