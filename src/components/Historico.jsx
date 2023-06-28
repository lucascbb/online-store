import React from 'react';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductSale } from '../services/api';
import Loading from './Loading';
import { formatNumber } from '../Helpers/formatPrice';
import '../CSS/destaquedoDia.css';

class Historico extends React.Component {
  constructor() {
    super();
    this.state = {
      listSales: '',
      categoryId: '',
    };
  }

  componentDidMount() {
    this.produtosPesquisados();
  }

  produtosPesquisados = async () => {
    const categoryId = localStorage.getItem('historico');

    const cinqueta = 50;
    const randomNum1 = Math.floor(Math.random() * cinqueta);
    const randomNum2 = Math.floor(Math.random() * cinqueta);
    const randomNum3 = Math.floor(Math.random() * cinqueta);
    const randomNum4 = Math.floor(Math.random() * cinqueta);
    const randomNum5 = Math.floor(Math.random() * cinqueta);

    const hisotrico = await getProductSale(categoryId);

    const listSales = [
      hisotrico.results[randomNum1],
      hisotrico.results[randomNum2],
      hisotrico.results[randomNum3],
      hisotrico.results[randomNum4],
      hisotrico.results[randomNum5],
    ];

    this.setState({
      listSales,
      categoryId,
    });
  };

  render() {
    const { listSales, categoryId } = this.state;

    return (
      <section className="main-DestaquedoDia">
        <h3>Baseado nas suas visitas</h3>
        <article className="lista-DestaquedoDia">
          {listSales[0] === undefined || categoryId === null ? <Loading />
            : listSales.map((product, index) => (
              <Link
                to={ `/produtoDetalhado/${product.id}` }
                key={ index }
                className="cada-DestaquedoDia"
              >
                <img src={ product.thumbnail } alt={ product.title } />
                <article>
                  <p className="title-DestaquedoDia">{product.title}</p>
                  {product.original_price && (
                    <s className="saleprice-DestaquedoDia">
                      { formatNumber(product.original_price) }
                    </s>)}
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

export default Historico;
