import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import { useState, useEffect } from 'react';

import db from './firebase/db';

import Home from './Home.js';
import NavBar from './components/NavBar';
import OnlyAvailable from './OnlyAvailable';
import CheapestFirst from './CheapestFirst';
import ContainsNike from './ContainsNike';
import AverageStock from './AverageStock';
import MostExpensive from './MostExpensive';
import EditForm from './components/EditForm';
import NewProduct from './NewProduct';

function App() {
  const [links, setLinks] = useState({
    'only available': '/only-available',
    'cheapest first': '/cheapest-first',
    'contains nike': '/contains-nike',
    'average stock': '/average-stock',
    'most expensive available': '/most-expensive',
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('shopItems').onSnapshot((snapshot) => {
      const data = [];

      snapshot.docs.forEach((product) => {
        const docItem = product.data();
        docItem['docId'] = product.id;

        data.push(docItem);
      });
      setProducts(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="container">
        <header className="d-flex justify-content-between mt-3">
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <h1 className="link-info">My Shop</h1>
          </NavLink>
        </header>
        <hr className="text-info" />
        <NavBar links={links} />
        <Switch>
          <Route path="/new-product">
            <NewProduct />
          </Route>
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
          <Route exact path="/">
            <Home products={products} setProducts={setProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
