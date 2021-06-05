import "./app.css";

import Home from "./components/HOME/Home";
import Login from "./components/LOGIN/Login";
import Main from "./components/MAIN/Main";
import Detail from "./components/DETAIL/Detail";

import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/movie/:id" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
