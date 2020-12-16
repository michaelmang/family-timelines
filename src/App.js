import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./index.css";
import "./App.css";

import Layout from "./components/Layout.js";
import Edit from "./pages/Edit.js";
import Index from "./pages/Index.js";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/edit">
            <Edit />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
