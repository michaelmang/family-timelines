import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Hero from "./components/Hero.js";
import Layout from "./components/Layout.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ProgressBar from "./components/ProgressBar.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Edit from "./pages/Edit.js";
import Index from "./pages/Index.js";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log({ user, isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <Layout>
        <ProgressBar />
        <Hero />
      </Layout>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/">
            <Index isAuthenticated={isAuthenticated} />
          </Route>
          <PrivateRoute isAuthenticated={isAuthenticated} exact path="/edit">
            <Edit />
          </PrivateRoute>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
