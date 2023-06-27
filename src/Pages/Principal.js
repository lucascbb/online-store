/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { TiArrowBackOutline } from 'react-icons/ti';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ShopContext from '../ShopContext';
import Produto from '../components/Produto';
import Categories from '../components/Categories';
import Carrousel from '../components/Carrousel';
import bussines from '../images/business.png';
import DestaquedoDia from '../components/DestaquedoDia';
import Header from '../components/Header';
import Historico from '../components/Historico';
import Footer from '../components/Footer';

function Principal() {
  const [campoDeBusca, setCampoDeBusca] = useState('');
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [deviceType, setDeviceType] = useState('mobile');
  const { resultado, setResultado, valor,
    setValor, nenhumResultado, setNenhumResultado } = useContext(ShopContext);

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

  // const calculaTotal = () => {
  //   const listaDeItens = JSON.parse(localStorage.getItem('product'));
  //   if (listaDeItens != null) {
  //     const setArray = new Set();
  //     const filtredArray = listaDeItens.filter((item) => {
  //       const duplicatedItem = setArray.has(item.id);
  //       setArray.add(item.id);
  //       return !duplicatedItem;
  //     });
  //     const ids = filtredArray.map((item) => item.id);
  //     const soma = ids.reduce((acc, numero) => {
  //       const quantidade = localStorage.getItem(`quantidade:${numero}`);
  //       acc += Number(quantidade);
  //       return acc;
  //     }, 0);
  //     setQuantidadeCarrinho(soma);
  //   }
  // };

  const salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) { antes = 0; }
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
    // calculaTotal();
  };

  const isMobileDevice = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setDeviceType('mobile');
    } else {
      setDeviceType('desktop');
    }
  };

  const back = () => {
    setValor(false);
  };

  useEffect(() => {
    // calculaTotal();
    isMobileDevice();
    // setValor(false);
  }, []);

  useEffect(() => {
    const cincomil = 5000;

    window.setTimeout(() => {
      if (document.getElementById('nenhumResultado')) {
        document.getElementById('nenhumResultado').innerHTML = '';
        setNenhumResultado(false);
      }
    }, cincomil);
    window.clearTimeout();
  }, [nenhumResultado]);

  return (
    <section>
      <Header />
      <div>
        <div className="principalResultado">
          {nenhumResultado && (
            <div id="nenhumResultado"><p>Nenhum Resultado Encontrado</p></div>)}
          { valor
              && (
                <Link
                  to="/"
                  onClick={ back }
                  className="voltar-Principal"
                >
                  <TiArrowBackOutline />
                  Voltar
                </Link>)}
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
            <Footer />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Principal;
