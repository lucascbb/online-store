import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ShopContext from '../ShopContext';
import Produto from '../components/Produto';
import Carrousel from '../components/Carrousel';
import DestaquedoDia from '../components/DestaquedoDia';
import Header from '../components/Header';
import Historico from '../components/Historico';
import Footer from '../components/Footer';

function Principal() {
  const { resultado, setResultado, valor,
    setValor, nenhumResultado, setNenhumResultado } = useContext(ShopContext);

  const getCategorieProducts = async ({ target }) => {
    const response = await getProductsFromCategoryAndQuery(target.id);
    setValor(true);
    setResultado(response.results);
  };

  const salvarQuantidade = (elemento) => {
    let antes = localStorage.getItem(elemento);
    if (antes === null) { antes = 0; }
    const novo = parseInt(antes, 10) + 1;
    localStorage.setItem(elemento, novo);
  };

  const back = () => {
    setValor(false);
  };

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
                productOriginalPrice={ ele.original_price }
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
