import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import { recuperaProdutos, SalvaProduto } from '../localStorage/localStorage';
import { formatNumber } from '../Helpers/formatPrice';

function Produto(props) {
  const {
    productName,
    productPrice,
    productOriginalPrice,
    productImage,
    categoryId,
    productId,
    salvarQuantidade,
    freeShipping,
    objItem,
  } = props;
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    setProductArray(objItem);
  }, [objItem]);

  const handleAddToCart = () => {
    const idQuantidade = `quantidade:${objItem.id}`;

    const recupera = recuperaProdutos();

    const res = localStorage.getItem('quantidade');
    localStorage.setItem('quantidade', Number(res) + 1);

    if (recupera !== null) {
      recupera.push(productArray);
      SalvaProduto(recupera);
    } else {
      SalvaProduto([productArray]);
    }
    salvarQuantidade(idQuantidade);
  };

  return (
    <div data-testid="product" className="paiProduto-Produto">
      {/* <button
        className="produtoButton"
        data-testid="product-add-to-cart"
        type="button"
        onClick={ handleAddToCart }
      >
        <FaCartPlus className="cartADD" />
      </button> */}
      <Link
        className="produtoLink"
        to={ `/produtoDetalhado/${productId}` }
        data-testid="product-detail-link"
        onClick={ () => localStorage.setItem('historico', categoryId) }
      >
        <img src={ productImage } alt={ productName } />
        <p className="produtoName">{productName}</p>
        {productOriginalPrice
          && <s className="produtoOriginalPrice">{formatNumber(productPrice)}</s>}
        <p className="produtoPrice">{formatNumber(productPrice)}</p>
      </Link>
      <div className="frete">
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

Produto.propTypes = {
  productName: PropTypes.string,
  productPrice: PropTypes.number,
  productImage: PropTypes.string,
  freeShipping: PropTypes.bool,
  objItem: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    id: PropTypes.string,
  }),
  productId: PropTypes.string,
  categoryId: PropTypes.string,
  salvarQuantidade: PropTypes.func,
}.isRequired;

export default Produto;
