import React, { Component } from 'react';
import './index.css';
import ProductPage from './component/ProductPage'
import {Route, NavLink, HashRouter} from 'react-router-dom'
import HomePage from './component/HomePage'
import ProductTablePage from './component/ProductTablePage'
import ShoppingcartPage from './component/ShoppingcartPage'

class App extends Component {
  render() {
    return (
        <HashRouter>
            <div>
                <h1>Ugly work bench</h1>
                <ul className="header">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    <li><NavLink to="/product">Product</NavLink></li>
                    <li><NavLink to="/producttable">Product table</NavLink></li>
                    <li><NavLink to="/shppingcart">Shopping cart items</NavLink></li>
                </ul>
                <div className="content">
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/product" component={ProductPage}/>
                    <Route path="/producttable" component={ProductTablePage}/>
                    <Route path="/shppingcart" component={ShoppingcartPage}/>
                </div>
            </div>
        </HashRouter>
    );
  }
}

export default App;
