//React
import React from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

//Fixed component
import Navbar from "./navBar";
import Login from "./Login/login";
import Drawer from "./drawer";

//Component
import viewresults from "./ViewResult/viewResult";
import HomePage from "./HomePage/homePage";
import NewProject from "./NewProject/newProject";
import NewModelSetting from "./NewModelSetting/newModelSetting";
import UploadInput from "./UploadInput/uploadInput";
import ValidateInput from "./ValidateInput/validateInput";
import PreTrainList from "./PreTrainModel/preTrainList";

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
