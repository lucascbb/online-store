/* eslint-disable max-lines */
/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import Produto from '../components/Produto';
import { getProductSale, getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../components/Categories';
import Carrousel from '../components/Carrousel';
import bussines from '../images/business.png';

class Principal extends React.Component {
  constructor() {
    super();
    this.state = {
      campoDeBusca: '',
      valor: false,
      resultadoDaBusca: {},
      quantidadeCarrinho: 0,
      deviceType: 'mobile',
      menu: false,
    };
  }

  componentDidMount() {
    this.calculaTotal();
    this.isMobileDevice();
    this.produtosRelevantes();
  }

  produtosRelevantes = async () => {
    const cinqueta = 50;
    randomNum = Math.floor(Math.random() * cinqueta);
    // const cabelos = await getProductSale('MLB1246');
    // console.log(cabelos.results);
    // const livros = await getProductSale('MLB1196');
    // console.log(livros.results);
    // const esporte = await getProductSale('MLB1276');
    // console.log(esporte.results);
    // const carro = await getProductSale('MLB1743');
    // console.log(carro.results);
    // const comida = await getProductSale('MLB410883');
    // console.log(comida.results[0]);
  };

  onChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { campoDeBusca } = this.state;
    const categories = await getProductsFromCategoryAndQuery(false, campoDeBusca);
    if (!categories) {
      this.setState({
        valor: false,
      });
    } else {
      this.setState({
        valor: true,
        resultadoDaBusca: categories,
      });
    }
  };

  getCategorieProducts = async ({ target }) => {
    this.setState({ menu: false });
    const response = await getProductsFromCategoryAndQuery(target.id);
    console.log(target.id);
    const { results } = response;
    console.log(results);
    this.setState({
      valor: true,
      resultadoDaBusca: { results },
    });
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

  isMobileDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.setState({
        deviceType: 'mobile',
      });
    } else {
      this.setState({
        deviceType: 'desktop',
      });
    }
  };

  menu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
    console.log('oi');
  };

  render() {
    const { campoDeBusca, valor, resultadoDaBusca,
      quantidadeCarrinho, deviceType, menu } = this.state;
    return (
      <section>
        {deviceType === 'mobile'
          ? (
            <>
              <div className="pai-Header">
                <div className="logo-search-cart-Header">
                  <button
                    type="button"
                    onClick={ this.menu }
                    className={ menu ? 'btnMenu-Header' : 'btnMenu-Header2' }
                  >
                    {menu
                      ? (
                        <IoMdClose className="iconMenu-Header" />
                      ) : (
                        <MdMenu className="iconMenu-Header" />
                      )}
                  </button>

                  <div className="logo-Header">
                    <img src={ bussines } alt="logo" />
                  </div>

                  <div className="cart-Header">
                    <Link
                      to="/cart"
                      data-testid="shopping-cart-button"
                    >
                      {!menu ? <BsCart3 className="iconCart-Header" /> : null}
                      {quantidadeCarrinho > 0
                        ? (
                          <p data-testid="shopping-cart-size" className="numCart-Header">
                            {quantidadeCarrinho}
                          </p>
                        ) : null}
                    </Link>
                  </div>

                </div>

                <div className="search-Header">
                  <label htmlFor="principalButton" className="label-Header">
                    <input
                      value={ campoDeBusca }
                      onChange={ this.onChange }
                      name="campoDeBusca"
                      placeholder="Busca aqui"
                      type="text"
                      data-testid="query-input"
                      id="principalButton"
                    />
                    <button
                      id="principalButton"
                      type="button"
                      data-testid="query-button"
                      onClick={ this.handleClick }
                    >
                      <CgSearch />
                    </button>
                  </label>
                </div>
              </div>
              <div>
                <Categories
                  open={ menu }
                  getProducts={ this.getCategorieProducts }
                />
                <div className="principalResultado">
                  {/* <h3 data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </h3> */}
                  <div className="principalProdutos">
                    {valor ? resultadoDaBusca.results.map((ele) => (
                      <Produto
                        getCartItens={ this.getCartItens }
                        objItem={ ele }
                        key={ ele.title }
                        productName={ ele.title }
                        productPrice={ ele.price }
                        productImage={ ele.thumbnail }
                        productId={ ele.id }
                        freeShipping={ ele.shipping.free_shipping }
                        salvarQuantidade={ this.salvarQuantidade }
                      />)) : (<Carrousel getProducts={ this.getCategorieProducts } />)}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="logo-search-cart-Header">
                { /* DIV 1  logo */}
                <div><img src={ bussines } alt="logo" width="60px" /></div>
                { /* DIV 2 label pesquisa */}
                <div className="search-Header">
                  <label htmlFor="principalButton" className="input-group mb-3">
                    <input
                      value={ campoDeBusca }
                      onChange={ this.onChange }
                      name="campoDeBusca"
                      type="text"
                      data-testid="query-input"
                      id="principalButton"
                      className="form-control"
                    />
                    <button
                      id="principalButton"
                      type="button"
                      data-testid="query-button"
                      onClick={ this.handleClick }
                      className="btn btn-outline-secondary"
                    >
                      <CgSearch />
                    </button>
                  </label>
                </div>
                { /* DIV 3  carrinho */}
                <div>
                  <Link
                    to="/cart"
                    data-testid="shopping-cart-button"
                  >
                    <BsCart3 />
                    <p data-testid="shopping-cart-size">{quantidadeCarrinho}</p>
                  </Link>
                </div>
              </div>
              <div className="principalMain">
                <Categories
                  getProducts={ this.getCategorieProducts }
                  className="principalCategories"
                />
                <div className="principalResultado">
                  <h3 data-testid="home-initial-message">
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </h3>
                  <div className="principalProdutos">
                    {valor ? resultadoDaBusca.results.map((ele) => (
                      <Produto
                        getCartItens={ this.getCartItens }
                        objItem={ ele }
                        key={ ele.title }
                        productName={ ele.title }
                        productPrice={ ele.price }
                        productImage={ ele.thumbnail }
                        productId={ ele.id }
                        freeShipping={ ele.shipping.free_shipping }
                        salvarQuantidade={ this.salvarQuantidade }
                      />)) : <p>Nenhum produto foi encontrado</p>}
                  </div>
                </div>
              </div>
            </>
          ) }
      </section>
    );
  }
}

export default Principal;
