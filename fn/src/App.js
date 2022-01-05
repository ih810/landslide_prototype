//React
import React from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

//Fixed component
import Navbar from "./Component/navBar";
import Login from "./Page/login";
import Drawer from "./Component/drawer";

import PrivateRoute from "./util/privateRoute";

//Component
import HomePage from "./Page/homepage";
import AdminHomePage from "./Page/adminHomepage";
import NewProject from "./Page/newProject";
import NewModelSetting from "./Page/newModelSetting";
import PreTrainList from "./Page/preTrainList";
import UploadInput from "./Page/uploadInput";
import ValidateInput from "./Page/validateInput";
import ViewPerformance from "./Page/viewPerformance";
import Viewresults from "./Page/viewResult";

export default function App(props) {
  const location = useLocation();
  const history = useHistory();
  const routes = [
    { path: "/", component: HomePage, exact: true },
    { path: "/admin", component: AdminHomePage, exact: false },
    { path: "/new-project", component: NewProject, exact: false },
    { path: "/train-new-model/:project_name", component: NewModelSetting, exact: false },
    { path: "/pre-train-model/:project_name", component: PreTrainList, exact: false },
    { path: "/upload-files/:project_name", component: UploadInput, exact: false },
    { path: "/validate-input/:project_name", component: ValidateInput, exact: false },
    { path: "/view-performance/:project_name", component: ViewPerformance, exact: false },
    { path: "/view-results/:project_name", component: Viewresults, exact: false },
  ];
  console.log(location)
  console.log(history)
  return (
    <>
      {
        location.pathname === "/login" ? (
          <>
            <Route path="/login" component={Login} />
          </>
        ) : (
          <>
            <Switch>
              <>
                <div style={{ height: "76px" }}>
                  <Navbar location={location.pathname} />
                </div>
                <Drawer />
                <div className="row">
                  {routes.map((route, i) => {
                    return (
                      <PrivateRoute
                        key={i}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                      />
                    );
                  })}
                </div>
              </>
            </Switch>
          </>
        )
      }
    </>
  );
}
