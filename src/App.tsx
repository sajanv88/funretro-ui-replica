import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Header from "./components/Header";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import PublicBoard from "./components/PublicBoard";
import AppProvider, { useAuth } from "./context/context";
import { AppEvent } from "./utils/AppEvent";

function LayoutWrapper() {
  const auth = useAuth();
  const { user } = auth;
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <Switch>
            <Route
              exact
              path="/public/:signature"
              render={props => (
                <PublicBoard
                  router={props}
                  signature={window.encodeURIComponent(
                    props.match.params.signature
                  )}
                />
              )}
              strict
            ></Route>

            <Route exact path="/not-found" strict>
              <NotFound />
            </Route>

            {!user && (
              <>
                <Redirect path="/" to="/login" />

                <Route exact path="/login" strict>
                  <Login />
                </Route>
                <Route exact path="/signup" strict>
                  <Signup />
                </Route>
              </>
            )}
            {user && (
              <>
                <Route exact path="/profile">
                  <Profile />
                </Route>
                <Route>
                  <Redirect to="/profile" />
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
