import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./components/Layout.js";
import Loader from "./components/Loader.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Edit from "./pages/Edit.js";
import Index from "./pages/Index.js";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) { 
    return <Loader />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <PrivateRoute exact path="/edit">
            <Edit />
          </PrivateRoute>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
