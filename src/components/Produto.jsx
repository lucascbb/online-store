import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  recuperaProdutos,
  SalvaProduto } from '../localStorage/localStorage';

class Produto extends React.Component {
  constructor() {
    super();
    this.state = {
      productArray: [],
    };
  }

  componentDidMount() {
    const { objItem } = this.props;
    this.setState({ productArray: objItem });
  }

  render() {
    const { productName, productPrice,
      productImage, productId, salvarQuantidade, objItem } = this.props;
    const { productArray } = this.state;
    return (
      <div data-testid="product">
        <Link to={ `/produtoDetalhado/${productId}` } data-testid="product-detail-link">
          <p>{ productName }</p>
          <p>{ productPrice }</p>
          <img src={ productImage } alt={ productName } />
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => {
            const idQuantidade = `quantidade:${objItem.id}`;
            salvarQuantidade(idQuantidade);
            //------------------
            const recupera = recuperaProdutos();
            if (recupera !== null) {
              recupera.push(productArray);
              SalvaProduto(recupera);
            } else SalvaProduto([productArray]);
          } }
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

Produto.propTypes = {
  productName: propTypes.string.isRequired,
  productPrice: propTypes.number.isRequired,
  productImage: propTypes.string.isRequired,
  objItem: propTypes.shape({
    title: propTypes.string,
    price: propTypes.number,
    thumbnail: propTypes.string,
    id: propTypes.string,
  }).isRequired,
  productId: propTypes.string.isRequired,
  salvarQuantidade: propTypes.func.isRequired,
};

export default Produto;