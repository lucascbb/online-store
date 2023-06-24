/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

class Avaliacao extends React.Component {
  constructor() {
    super();

    this.state = {
      array: ['1', '2', '3', '4', '5'],
    };
  }

  saveRating = (value) => {
    const { saveRating } = this.props;
    saveRating(value);
  };

  render() {
    const { array } = this.state;
    const { saveRating, ratingValue } = this.props;
    return (
      <div className="main-Rating">
        {saveRating ? (
          <div className="review-Rating">
            {array.map((ele, index) => (
              <React.Fragment key={ ele }>
                <input
                  id={ ele }
                  type="checkbox"
                  data-testid={ `${index + 1}-rating` }
                  checked={ ratingValue === ele }
                  onChange={ this.saveRating }
                  className="start-Rating"
                />
                <label htmlFor={ ele }>&#9733;</label>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div data-testid="review-card-Rating" className="comment-Rating">
            {array.map((ele, index) => (
              <React.Fragment key={ ele }>
                <input
                  id={ ele }
                  type="checkbox"
                  data-testid={ `${index + 1}-rating` }
                  checked={ ratingValue === ele }
                  onChange={ () => saveRating(parseInt(ele, 10)) }
                />
                <label htmlFor={ ele }>&#9733;</label>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
}

Avaliacao.defaultProps = {
  saveRating: false,
};

Avaliacao.propTypes = {
  saveRating: PropTypes.func,
  ratingValue: PropTypes.number,
}.isRequired;

export default Avaliacao;
