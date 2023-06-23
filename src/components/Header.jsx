/* eslint-disable react/jsx-max-depth */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { MdMenu } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import ShopContext from '../ShopContext';
import { getProductsFromCategoryAndQuery } from '../services/api';
import bussines from '../images/business.png';
import Categories from './Categories';

function Header() {
  const [campoDeBusca, setCampoDeBusca] = useState('');

  const [menu, setMenu] = useState(false);
  const { setResultado, setValor, setNenhumResultado } = useContext(ShopContext);

  const handleClick = async () => {
    const categories = await getProductsFromCategoryAndQuery(false, campoDeBusca);
    if (categories.results.length === 0) {
      setValor(false);
      setNenhumResultado(true);
    } else {
      setValor(true);
      setResultado(categories.results);
      setNenhumResultado(false);
    }
    setCampoDeBusca('');
  };

  const onChange = (event) => {
    const { value } = event.target;
    setCampoDeBusca(value);
  };

  const toggleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const getCategorieProducts = async ({ target }) => {
    const response = await getProductsFromCategoryAndQuery(target.id);
    const { results } = response;
    setValor(true);
    setResultado(results);
    setMenu(false);
  };

  return (
    <header>
      <div className="pai-Header">
        <div className="logo-search-cart-Header">
          <button
            type="button"
            onClick={ toggleMenu }
            className={ menu ? 'btnMenu-Header' : 'btnMenu-Header2' }
          >
            {menu ? <IoMdClose
              className="iconMenu-Header"
            /> : <MdMenu className="iconMenu-Header" />}
          </button>

          <Link className="logo-Header" to="/" onClick={ () => setValor(false) }>
            <img src={ bussines } alt="logo" />
          </Link>

          <div className="cart-Header">
            <Link to="/cart" data-testid="shopping-cart-button">
              {!menu ? (
                <>
                  <BsCart3 className="iconCart-Header" />
                  {localStorage.getItem('quantidade') > 0 ? (
                    <p data-testid="shopping-cart-size" className="numCart-Header">
                      {localStorage.getItem('quantidade')}
                    </p>
                  ) : null}
                </>
              ) : null}
            </Link>
          </div>
        </div>

        <div className="search-Header">
          <label htmlFor="principalButton" className="label-Header">
            <input
              value={ campoDeBusca }
              onChange={ onChange }
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
              disabled={ campoDeBusca === '' }
              onClick={ handleClick }
            >
              <CgSearch />
            </button>
            {/* </Link> */}
          </label>
        </div>
        <div className="categories-vertical">
          <Categories open={ menu } getProducts={ getCategorieProducts } />
        </div>
      </div>
    </header>
  );
}

export default Header;
