
import './App.css';
import Home from './Components/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './Components/Others/About/About';
import Contact from './Components/Others/Contact/Contact';
import NotFound from './Components/404Page/NotFound';
import Login from './Components/Login/Login';

;


function App() {


  return (
    <Router>
      <Switch>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="*">
          <NotFound/>
        </Route>

      </Switch>
    </Router>


  );
}


export default App;
