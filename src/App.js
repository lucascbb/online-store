/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import ShopContext from './ShopContext';

function App() {
  const [resultado, setResultado] = useState('');
  const [valor, setValor] = useState(false);
  const [nenhumResultado, setNenhumResultado] = useState(false);
  const [quantity, setQuantity] = useState(localStorage.getItem('quantidade'));

  return (
    <BrowserRouter>
      <ShopContext.Provider
        value={ { resultado,
          setResultado,
          valor,
          setValor,
          nenhumResultado,
          setNenhumResultado,
          quantity,
          setQuantity,
        } }
      >
        <Routes />
      </ShopContext.Provider>
    </BrowserRouter>
  );
}

export default App;
