
import './App.css';
import Table from './components/Table'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
    <Switch>
      <Route path="/">
        <Table/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
