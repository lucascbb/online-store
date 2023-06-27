import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import ItemCart from '../components/ItemCart';
import { recuperaProdutos } from '../localStorage/localStorage';
// import logo from '../CSS/images/logo.png';
import Header from '../components/Header';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { temAlgo: false, cartArray: [], cartArrayFiltred: [], total: 0 };
  }

  componentDidMount() {
    this.validadeItens();
    this.calculaTotaldoCarrinho();
  }

  validadeItens = () => {
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      this.setState({ temAlgo: true, cartArray: produtos }, this.removeDuplicates);
    }
  };

  decreaseItem = (productID) => {
    let quantidade = localStorage.getItem(productID);
    quantidade = parseInt(quantidade, 10) - 1;
    if (!quantidade < 1) {
      localStorage.setItem(productID, quantidade);
      this.forceUpdate();
      // this.setState({ teste: true });
    }
  };

  increaseItem = (productID) => {
    let quantidade = localStorage.getItem(productID);
    quantidade = parseInt(quantidade, 10) + 1;
    localStorage.setItem(productID, quantidade);
    this.forceUpdate();
  };

  removeItem = (productID) => {
    // const productID = `quantidade:${id}`;
    localStorage.removeItem(`quantidade:${productID}`);
    const listaDeItens = JSON.parse(localStorage.getItem('productFiltred'));
    const itemRemoved = listaDeItens.find((item) => (item.id === productID));
    const index = listaDeItens.indexOf(itemRemoved);
    listaDeItens.splice(index, 1);

    localStorage.setItem('productFiltred', JSON.stringify(listaDeItens));
    localStorage.setItem('product', JSON.stringify(listaDeItens));
    this.setState({
      cartArrayFiltred: listaDeItens,
    }, this.calculaTotaldoCarrinho);
    this.forceUpdate();
    // this.setState({ teste: true });
  };

  calcula = (productThumbnailId) => {
    const quantidade = localStorage.getItem(productThumbnailId);
    return quantidade;
  };

  calculaTotaldoCarrinho = () => {
    const { cartArrayFiltred } = this.state;
    setTimeout(() => {
      if (cartArrayFiltred.length !== 0) {
        const soma = cartArrayFiltred.reduce((acc, item) => {
          const quantidade = localStorage.getItem(`quantidade:${item.id}`);
          const sum = Number(quantidade) * item.price;
          acc += sum;
          return acc;
        }, 0);

        this.setState({ total: soma });
      }
    }, 100);
    if (cartArrayFiltred.length === 0) {
      this.setState({ total: 0 });
    }
  };

  removeDuplicates = () => {
    const { cartArray } = this.state;

    const setArray = new Set();
    const filtredArray = cartArray.filter((item) => {
      const duplicatedItem = setArray.has(item.id);
      setArray.add(item.id);
      return !duplicatedItem;
    });
    this.setState({
      cartArrayFiltred: filtredArray,
    }, this.calculaTotaldoCarrinho);
    localStorage.setItem('productFiltred', JSON.stringify(filtredArray));
    localStorage.setItem('product', JSON.stringify(filtredArray));
  };

  finish = () => {
    const { history } = this.props;
    history.push('/checkout');
  };

  render() {
    const { temAlgo, cartArrayFiltred, total } = this.state;
    return (
      <div>
        <Header />
        <Link
          to="/"
          className="voltar-ProdutoDetalhado"
        >
          <TiArrowBackOutline />
          Voltar
        </Link>
        <div className="CartSecondaryDiv">
          {!temAlgo && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <div className="Cart-CartItensDiv">
            <h1 className="Cart-Title">Carrinho de Compras</h1>
            {temAlgo
          && cartArrayFiltred.map((item, index) => (
            <ItemCart
              calculaTotaldoCarrinho={ this.calculaTotaldoCarrinho }
              decreaseItem={ this.decreaseItem }
              increaseItem={ this.increaseItem }
              removeItem={ this.removeItem }
              quantity={ this.calcula(item.thumbnail_id) }
              key={ index }
              cartItensArray={ item }
            />
          ))}
          </div>
          <div className="CartTotalDiv">
            <div className="CartSomaTotal">
              <h1>Valor total da compra</h1>
              <h3>
                {total.toLocaleString(
                  'pt-br',
                  { style: 'currency', currency: 'BRL' },
                )}
              </h3>
            </div>
            <button
              className="CartFinishBtn"
              type="button"
              onClick={ () => { this.finish(); } }
              disabled={ localStorage.getItem('quantidade') <= 0 }
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Cart;
