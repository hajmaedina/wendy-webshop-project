import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
import MoreFilters from './components/MoreFilters';
import FilterByType from './components/FilterByType';

function App() {
  const [links, setLinks] = useState({
    'only available': '/only-available',
    'cheapest first': '/cheapest-first',
    'contains nike': '/contains-nike',
    'average stock': '/average-stock',
    'most expensive available': '/most-expensive',
    'euro': '/price-in-eur',
    'original currency': './price-in-original',
  });

  const [typeLinks, setTypeLinks] = useState([]);

  const [products, setProducts] = useState([]);
  const [moreVisible, setMoreVisibility] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection('shopItems').onSnapshot((snapshot) => {
      const data = [];

      snapshot.docs.forEach((product) => {
        const docItem = product.data();
        docItem['docId'] = product.id;

        data.push(docItem);
      });
      setProducts(data);
      getTypeLinks(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function getTypeLinks(data) {
    data.forEach((item) => {
      if (!typeLinks.includes(item.type)) {
        typeLinks[item.type] = `/filter-by-type/${item.type}`;
      }
    });
  }

  function setMoreStatus() {
    setMoreVisibility(true);
  }

  function setShopStatus() {
    setMoreVisibility(false);
  }

  return (
    <Router>
      <div className="container">
        <header className="d-flex justify-content-between mt-3">
          <NavLink to="/webshop" style={{ textDecoration: 'none' }}>
            <h1 className="link-info" onClick={setShopStatus}>My Shop</h1></NavLink>
          <Link to="/more-filters" style={{ textDecoration: 'none' }}><h1 className="link-info" onClick={setMoreStatus}>More >></h1></Link>
        </header>
        <hr className="text-info" />
        {moreVisible ? <NavBar links={typeLinks} /> : <NavBar links={links} />}
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
          <Route path="/price-in-original">
            <Home products={products} setProducts={setProducts} currency={'forint'}/>
          </Route>
          <Route path="/price-in-eur">
            <Home products={products} setProducts={setProducts} currency={'euro'}/>
          </Route>
          <Route path="/filter-by-type/:type">
            <FilterByType products={products}/>
          </Route>
          <Route path="/more-filters">
            <MoreFilters products={products} setProducts={setProducts} />
          </Route>
          <Route path="/webshop">
            <Home products={products} setProducts={setProducts} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
