import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";

import AppProvider, { useAuth } from "./context/context";
function LayoutWrapper() {
  const auth = useAuth();
  const { user } = auth;
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <Switch>
            {!user && (
              <>
                <Route path="/signup" exact={true}>
                  <Signup />
                </Route>
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
                <Route path="/" exact={true}>
                  <Login />
                </Route>
              </>
            )}
            {user && (
              <>
                <Route path="/profile" exact={true}>
                  <Profile />
                </Route>
                <Route path="/">
                  <Profile />
                </Route>
              </>
            )}
          </Switch>
        </div>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="w-full">
          <Header />
          <LayoutWrapper />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
