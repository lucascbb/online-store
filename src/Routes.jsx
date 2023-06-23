import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Principal from './Pages/Principal';
import Cart from './Pages/Cart';
import ProdutoDetalhado from './components/ProdutoDetalhado';
import Checkout from './Pages/Checkout';
// import { recuperaProdutos } from './localStorage/localStorage';

class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Principal }
        />
        <Route
          path="/cart"
          component={ Cart }
        />
        <Route
          path="/checkout"
          component={ Checkout }
        />
        <Route path="/produtoDetalhado/:id" component={ ProdutoDetalhado } />

      </Switch>
    );
  }
}

export default Router;
