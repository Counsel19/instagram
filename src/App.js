import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as ROUTES from "./contants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoutes from "./helpers/ProtectedRoutes";

import { BarLoader } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
import ViewCommentsContextProvider from "./context/viewComments";
import UserRedirect from "./helpers/userRedirect";

const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ViewComments = lazy(() => import("./pages/ViewComments"));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <ViewCommentsContextProvider>
        <Router>
          <Suspense
            fallback={
              <BarLoader
                text={"Loading..."}
                bgColor={"#fff"}
                center={true}
                width={"150px"}
                height={"150px"}
              />
            }
          >
            <Routes>
              <Route element={<UserRedirect user={user} redirect={ROUTES.DASHBOARD}/>}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
              </Route>
              <Route element={<UserRedirect user={user} redirect={ROUTES.DASHBOARD} />}>
                <Route path={ROUTES.SIGN_UP} element={<Signup />} />
              </Route>
              <Route element={<ProtectedRoutes user={user} />}>
                <Route
                  path={ROUTES.DASHBOARD}
                  element={
                    <>
                      <Dashboard />
                      <ViewComments />
                    </>
                  }
                />
                <Route
                  path={ROUTES.PROFILE}
                  element={
                    <>
                      <Profile />
                      <ViewComments />
                    </>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </ViewCommentsContextProvider>
    </UserContext.Provider>
  );
}

export default App;
