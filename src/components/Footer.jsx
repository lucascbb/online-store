import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Footer() {
  // const [campoDeBusca, setCampoDeBusca] = useState('');

  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/contato">
              Contato
            </Link>
          </li>
          <li>
            <Link to="/sobre">
              Sobre o E-commerce
            </Link>
          </li>
          <li>
            <a href="https://github.com/lucascbb/online-store">
              Código
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
