import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
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
      productImage, productId, salvarQuantidade, freeShipping, objItem } = this.props;
    const { productArray } = this.state;

    return (
      <div data-testid="product" className="paiProduto-Produto">
        <Link
          className="produtoLink"
          to={ `/produtoDetalhado/${productId}` }
          data-testid="product-detail-link"
        >
          <img src={ productImage } alt={ productName } />
          <p className="produtoName">{ productName }</p>
          <p className="produtoPrice">{`R$ ${productPrice}` }</p>
        </Link>
        <button
          className="produtoButton"
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => {
            const idQuantidade = `quantidade:${objItem.id}`;
            const recupera = recuperaProdutos();
            if (recupera !== null) {
              recupera.push(productArray);
              SalvaProduto(recupera);
            } else SalvaProduto([productArray]);
            salvarQuantidade(idQuantidade);
          } }
        >
          <FaCartPlus />
        </button>
        <div
          className="frete"
        >
          {freeShipping && (
            <h4 data-testid="free-shipping">
              Frete Grátis
              <TbTruckDelivery className="iconTruck-Produto" />
            </h4>
          )}
        </div>
      </div>
    );
  }
}

Produto.propTypes = {
  productName: propTypes.string.isRequired,
  productPrice: propTypes.number.isRequired,
  productImage: propTypes.string.isRequired,
  freeShipping: propTypes.bool.isRequired,
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
