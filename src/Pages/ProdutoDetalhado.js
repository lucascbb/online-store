import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { TiArrowBackOutline } from 'react-icons/ti';
import { TbTruckDelivery } from 'react-icons/tb';
import Slider from 'react-slick';
import { getProductById } from '../services/api';
import FormComentarios from '../components/FormComentarios';
import {
  SalvaProduto,
  recuperaProdutos } from '../localStorage/localStorage';
import Header from '../components/Header';
import { formatNumber } from '../Helpers/formatPrice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class ProdutoDetalhado extends React.Component {
  constructor() {
    super();
    this.state = {
      product: [],
      loading: true,
      produtosSalvos: [],
      id: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const produtoDetalhado = await getProductById(id);
    this.setState({ product: [produtoDetalhado], loading: false, id });
    this.calculaTotal();
  }

  onClickButton = () => {
    const { product } = this.state;

    const idQuantidade = `quantidade:${product[0].id}`;
    this.salvarQuantidade(idQuantidade);

    const res = localStorage.getItem('quantidade');
    localStorage.setItem('quantidade', Number(res) + 1);

    const produto = product;
    const produtos = recuperaProdutos();
    if (produtos !== null) {
      const [produtoObj] = produto;
      produtos.push(produtoObj);
      this.setState({
        produtosSalvos: produtos,
      }, () => {
        const { produtosSalvos } = this.state;
        SalvaProduto(produtosSalvos);
      });
    } else {
      this.setState({
        produtosSalvos: produto,
      }, () => {
        const { produtosSalvos } = this.state;
        SalvaProduto(produtosSalvos);
      });
    }
  };

  salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) {
      antes = 0;
    }
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
    this.calculaTotal();
  };

  calculaTotal = () => {
    const listaDeItens = JSON.parse(localStorage.getItem('product'));
    if (listaDeItens != null) {
      const setArray = new Set();
      const filtredArray = listaDeItens.filter((item) => {
        const duplicatedItem = setArray.has(item.id);
        setArray.add(item.id);
        return !duplicatedItem;
      });
      const ids = filtredArray.map((item) => item.id);
      const soma = ids.reduce((acc, numero) => {
        const quantidade = localStorage.getItem(`quantidade:${numero}`);
        acc += Number(quantidade);
        return acc;
      }, 0);
      this.setState({ quantidadeCarrinho: soma });
    }
  };

  onBuy = () => {
    this.onClickButton();
    window.location.replace('/cart');
  };

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { product, loading, id } = this.state;
    return (
      <div>
        <Header />
        {loading ? <p>Carregando...</p>
          : product.map((element, index) => (
            <div key={ index } className="main-ProdutoDetalhado">
              <Link
                to="/"
                data-testid="shopping-cart-button"
                className="voltar-ProdutoDetalhado"
              >
                <TiArrowBackOutline />
                Voltar
              </Link>
              <p
                className="title-ProdutoDetalhado"
                data-testid="product-detail-name"
              >
                { element.title }
              </p>
              <Slider { ...settings } className="slider-ProdutoDetalhado">
                {element.pictures.map((ele, i) => (
                  <div key={ i }>
                    <span>{`${i + 1} / ${element.pictures.length}`}</span>
                    <img src={ ele.url } alt={ element.title } />
                  </div>
                ))}
              </Slider>
              <div className="prices-ProdutoDetalhado">
                { element.original_price
                && (
                  <s className="oldPrice-ProdutoDetalhado">
                    { formatNumber(element.original_price) }
                  </s>)}
                <p
                  data-testid="product-detail-price"
                  className="price-ProdutoDetalhado"
                >
                  { formatNumber(element.price) }
                </p>
              </div>
              <div>
                {element.shipping.free_shipping
              && (
                <span
                  data-testid="free-shipping"
                  className="frete-ProdutoDetalhado"
                >
                  Frete Grátis
                  <TbTruckDelivery className="iconTruck-ProdutoDetalhado" />
                </span>
              )}
              </div>
              <button
                name="buy"
                type="button"
                onClick={ this.onBuy }
                className="btnBuy-ProdutoDetalhado"
              >
                Comprar agora
              </button>
              <button
                name="Add Cart"
                type="button"
                data-testid="product-detail-add-to-cart"
                onClick={ this.onClickButton }
                className="btnAdd-ProdutoDetalhado"
              >
                Adicionar ao carrinho
              </button>
              <FormComentarios productId={ id } />
            </div>
          ))}
        {/* <Link to="/cart" data-testid="shopping-cart-button">
          <div>
            <p>Cart</p>
            <p data-testid="shopping-cart-size">{quantidadeCarrinho}</p>
          </div>
        </Link> */}
      </div>
    );
  }
}

ProdutoDetalhado.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProdutoDetalhado;
