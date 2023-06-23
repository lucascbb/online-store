import React from 'react';
import propTypes from 'prop-types';

class ItemCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantidade: 1,
    };
  }

  componentDidMount() {
    this.recuperarQuantidade();
  }

  recuperarQuantidade = () => {
    const { cartItensArray } = this.props;
    const { id } = cartItensArray;

    const quantidade = localStorage.getItem(`quantidade:${id}`);
    if (quantidade != null) {
      this.setState({ quantidade: Number(quantidade) });
    }
  };

  aumentar = () => {
    this.setState(
      (prevState) => ({ quantidade: prevState.quantidade + 1 }),
      this.salvarLocalStorage,
    );

    const res = localStorage.getItem('quantidade');
    localStorage.setItem('quantidade', Number(res) + 1);
    calculaTotaldoCarrinho();
  };

  diminuir = () => {
    this.setState((prevState) => {
      if (prevState.quantidade <= 1) {
        return { quantidade: 1 };
      }
      return { quantidade: prevState.quantidade - 1 };
    }, this.salvarLocalStorage);

    const res = localStorage.getItem('quantidade');
    if (res >= 2) {
      localStorage.setItem('quantidade', Number(res) - 1);
    }

    calculaTotaldoCarrinho();
  };

  salvarLocalStorage = () => {
    const { quantidade } = this.state;
    const { cartItensArray } = this.props;
    const { id } = cartItensArray;

    localStorage.setItem(`quantidade:${id}`, Number(quantidade));
  };

  remove = (id) => {
    const { removeItem } = this.props;
    const { quantidade } = this.state;
    removeItem(id);
    const res = localStorage.getItem('quantidade');
    localStorage.setItem('quantidade', Number(res) - quantidade);
  };

  render() {
    const { cartItensArray } = this.props;
    const { title, price, thumbnail, id } = cartItensArray;
    const { quantidade } = this.state;

    return (
      <div className="ItemCartDivPrincipal">
        <div className="ItemCartDivRemoveButton">
          <button
            onClick={ () => { this.remove(id); } }
            data-testid="remove-product"
            type="button"
          >
            X
          </button>
        </div>
        <img src={ thumbnail } alt={ title } />
        <div className="ItemCartTitleDiv">
          <p data-testid="shopping-cart-product-name">{title}</p>
        </div>
        <div className="ItemCartDivButtons">
          <button
            onClick={ () => { this.diminuir(); } }
            data-testid="product-decrease-quantity"
            type="button"
          >
            -
          </button>
          <p data-testid="shopping-cart-product-quantity">
            {quantidade}
          </p>
          <button
            onClick={ () => { this.aumentar(); } }
            data-testid="product-increase-quantity"
            type="button"
          >
            +
          </button>
        </div>
        <div className="ItemCartDivPrice">
          <p>
            {`${price.toLocaleString(
              'pt-br',
              { style: 'currency', currency: 'BRL' },
            )}`}
          </p>
        </div>
      </div>
    );
  }
}

ItemCart.propTypes = {
  cartItensArray: propTypes.shape({
    title: propTypes.string,
    price: propTypes.number,
    thumbnail: propTypes.string,
    id: propTypes.string,
    thumbnail_id: propTypes.string,
    available_quantity: propTypes.number,
  }),
  removeItem: propTypes.func,
  calculaTotaldoCarrinho: propTypes.func,
}.isRequired;

export default ItemCart;
