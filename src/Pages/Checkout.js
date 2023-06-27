/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';

class Checkout extends React.Component {
  constructor() {
    super();

    this.state = {
      valid: false,
      product: [],
      fullname: '',
      email: '',
      address: '',
      cpf: '',
      cep: '',
      phone: '',
      payment: '',
    };
  }

  componentDidMount() {
    const product = localStorage.getItem('product');
    const productPARSE = JSON.parse(product);
    this.setState({ product: productPARSE });
  }

  validateInputs = () => {
    const { fullname, address, cep, cpf, phone, email, payment } = this.state;
    const valid = !!(fullname && address && cep && cpf && phone && email && payment);
    if (!valid) {
      this.setState({ valid: true });
    } else {
      this.finishOrder();
      this.setState({ valid: false });
    }
  };

  finishOrder = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }));
  };

  render() {
    const { product, fullname, address, cep, cpf, phone, email, valid } = this.state;
    return (
      <>
        <Header />
        <section className="main-Checkout">
          <div className="cart-products">
            <h3>Revise seus Produtos</h3>
            { product.map((ele) => <p key={ ele.id }>{ele.title}</p>) }
          </div>
          <div className="buyer-info">
            <h3>Informações do Comprador</h3>
            <form className="checkout-form">
              <TextField
                id="standard-basic"
                label="Nome Completo"
                variant="standard"
                htmlFor="fullname"
                value={ fullname }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'fullname',
                  'data-testid': 'checkout-fullname',
                } }
              />
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                htmlFor="email"
                value={ email }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'email',
                  'data-testid': 'checkout-email',
                } }
              />
              <TextField
                id="standard-basic"
                label="CPF"
                variant="standard"
                htmlFor="cpf"
                value={ cpf }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'cpf',
                  'data-testid': 'checkout-cpf',
                } }
              />
              <TextField
                id="standard-basic"
                label="Telefone"
                variant="standard"
                htmlFor="phone"
                value={ phone }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'phone',
                  'data-testid': 'checkout-phone',
                } }
              />
              <TextField
                id="standard-basic"
                label="CEP"
                variant="standard"
                htmlFor="cep"
                value={ cep }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'cep',
                  'data-testid': 'checkout-cep',
                } }
              />
              <TextField
                id="standard-basic"
                label="Endereço"
                variant="standard"
                htmlFor="address"
                value={ address }
                onChange={ this.handleChange }
                inputProps={ {
                  name: 'address',
                  'data-testid': 'checkout-address',
                } }
              />
            </form>
          </div>
          <div className="payment-metod">
            <h3>Método de Pagamento</h3>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="boleto"
                onClick={ this.handleChange }
                data-testid="ticket-payment"
              />
              Boleto
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="visa"
                onClick={ this.handleChange }
                data-testid="visa-payment"
              />
              Visa
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="mastercard"
                onClick={ this.handleChange }
                data-testid="master-payment"
              />
              MasterCard
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                id="elo"
                onClick={ this.handleChange }
                data-testid="elo-payment"
              />
              Elo
            </label>
          </div>
          { valid && <p data-testid="error-msg">Campos inválidos</p> }
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.validateInputs }
          >
            Comprar
          </button>
        </section>
      </>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
