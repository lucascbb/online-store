import React from 'react';
import PropTypes from 'prop-types';
import { GrFormNextLink } from 'react-icons/gr';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.getListCategories();
  }

  getListCategories = async () => {
    const categoriesList = await getCategories();
    this.setState({ categoriesList });
  };

  render() {
    const { categoriesList } = this.state;
    const { getProducts, open } = this.props;
    return (
      <div className={ open ? 'menuOpen-Header' : 'menuClosed-Header' }>
        <h1>Categorias</h1>
        {categoriesList.map((categorie, index) => (
          <Link key={ index } to="/">
            <button
              className="categorieButton"
              id={ categorie.id }
              type="button"
              data-testid="category"
              onClick={ getProducts }
            >
              {categorie.name}
              <GrFormNextLink
                className="iconArrow-Header"
                onClick={ getProducts }
                id={ categorie.id }
              />
            </button>
          </Link>
        ))}
      </div>
    );
  }
}

Categories.propTypes = {
  getProducts: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Categories;
