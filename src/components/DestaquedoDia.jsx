import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductSale } from '../services/api';
import Loading from './Loading';
import { formatNumber } from '../Helpers/formatPrice';
import '../CSS/destaquedoDia.css';

class DestaquedoDia extends React.Component {
  constructor() {
    super();
    this.state = {
      listSales: '',
    };
  }

  componentDidMount() {
    this.produtosRelevantes();
  }

  produtosRelevantes = async () => {
    const cinqueta = 50;
    const randomNum = Math.floor(Math.random() * cinqueta);

    const cabelos = await getProductSale('MLB1246');
    const livros = await getProductSale('MLB1196');
    const esporte = await getProductSale('MLB1276');
    const carro = await getProductSale('MLB1743');
    const comida = await getProductSale('MLB410883');

    const listSales = [
      comida.results[randomNum],
      cabelos.results[randomNum],
      livros.results[randomNum],
      esporte.results[randomNum],
      carro.results[randomNum],
    ];

    this.setState({
      listSales,
    });
  };

  render() {
    const { listSales } = this.state;

    return (
      <section className="main-DestaquedoDia">
        <h3>Destaques do dia</h3>
        <article className="lista-DestaquedoDia">
          {listSales.length === 0 ? <Loading />
            : listSales.map((product) => (
              <Link
                to={ `/produtoDetalhado/${product.id}` }
                key={ product.id }
                className="cada-DestaquedoDia"
                onClick={ () => localStorage.setItem('historico', product.category_id) }
              >
                <img src={ product.thumbnail } alt={ product.title } />
                <article>
                  <p className="title-DestaquedoDia">{product.title}</p>
                  <p className="price-DestaquedoDia">
                    { formatNumber(product.price) }
                  </p>
                </article>
                <article className="mainFrete-DestaquedoDia">
                  {product.shipping.free_shipping ? (
                    <p className="frete-DestaquedoDia">
                      Frete Gratis
                      <TbTruckDelivery className="iconTruck-DestaquedoDia" />
                    </p>) : (null)}
                </article>
              </Link>
            ))}
        </article>
      </section>
    );
  }
}

export default DestaquedoDia;
