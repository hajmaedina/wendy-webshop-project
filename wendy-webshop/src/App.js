import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home.js';
import OnlyAvailable from './OnlyAvailable';
import CheapestFirst from './CheapestFirst';
import ContainsNike from './ContainsNike';
import AverageStock from './AverageStock';
import MostExpensive from './MostExpensive';
import NewProduct from './NewProduct';
import EditForm from './components/EditForm';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product/edit/:id">
          <EditForm />
        </Route>
        <Route path="/only-available">
          <OnlyAvailable />
        </Route>
        <Route path="/cheapest-first">
          <CheapestFirst />
        </Route>
        <Route path="/contains-nike">
          <ContainsNike />
        </Route>
        <Route path="/average-stock">
          <AverageStock />
        </Route>
        <Route path="/most-expensive">
          <MostExpensive />
        </Route>
        <Route path="/new-product">
          <NewProduct />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
