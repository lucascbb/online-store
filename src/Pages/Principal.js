/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ShopContext from '../ShopContext';
import Produto from '../components/Produto';
import Categories from '../components/Categories';
import Carrousel from '../components/Carrousel';
import bussines from '../images/business.png';
import DestaquedoDia from '../components/DestaquedoDia';
import Header from '../components/Header';
import Historico from '../components/Historico';

function Principal() {
  const [campoDeBusca, setCampoDeBusca] = useState('');
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [deviceType, setDeviceType] = useState('mobile');
  const { resultado, setResultado, valor,
    setValor, nenhumResultado } = useContext(ShopContext);

  const onChange = ({ target }) => {
    const { value } = target;
    setCampoDeBusca(value);
  };

  const handleClick = async () => {
    const categories = await getProductsFromCategoryAndQuery(false, campoDeBusca);
    if (!categories) {
      setValor(false);
    } else {
      setValor(true);
      setResultado(categories.results);
    }
  };

  const getCategorieProducts = async ({ target }) => {
    const response = await getProductsFromCategoryAndQuery(target.id);
    setValor(true);
    setResultado(response.results);
  };

  const calculaTotal = () => {
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
      setQuantidadeCarrinho(soma);
    }
  };

  const salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) { antes = 0; }
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
    calculaTotal();
  };

  const isMobileDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  };

  useEffect(() => {
    calculaTotal();
    isMobileDevice();
    setValor(false);
  }, []);

  useEffect(() => {
    console.log(nenhumResultado);
  }, [nenhumResultado]);

  return (
    <section>
      {deviceType === 'mobile' ? (
        <>
          <Header />
          <div>
            <div className="principalResultado">
              <div className="principalProdutos">
                {valor ? resultado.map((ele) => (
                  <Produto
                    objItem={ ele }
                    key={ ele.id }
                    productName={ ele.title }
                    productPrice={ ele.price }
                    productImage={ ele.thumbnail }
                    productId={ ele.id }
                    freeShipping={ ele.shipping.free_shipping }
                    categoryId={ ele.category_id }
                    salvarQuantidade={ salvarQuantidade }
                  />
                ))
                  : (
                    <>
                      <Carrousel getProducts={ getCategorieProducts } />
                      <DestaquedoDia />
                      {localStorage.getItem('historico') ? <Historico /> : null}
                    </>
                  )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="logo-search-cart-Header">
            <div><img src={ bussines } alt="logo" width="60px" /></div>
            <div className="search-Header">
              <label htmlFor="principalButton" className="input-group mb-3">
                <input
                  value={ campoDeBusca }
                  onChange={ onChange }
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
                  onClick={ handleClick }
                  className="btn btn-outline-secondary"
                >
                  <CgSearch />
                </button>
              </label>
            </div>
            <div>
              <Link to="/cart" data-testid="shopping-cart-button">
                <BsCart3 />
                <p data-testid="shopping-cart-size">{quantidadeCarrinho}</p>
              </Link>
            </div>
          </div>
          <div className="principalMain">
            <Categories
              getProducts={ getCategorieProducts }
              className="principalCategories"
            />
            <div className="principalResultado">
              <h3 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h3>
              <div className="principalProdutos">
                {/* {valor ? resultadoDaBusca.results.map((ele) => (
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
                  />)) : <p>Nenhum produto foi encontrado</p>} */}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Principal;
