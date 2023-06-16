import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../images/baby.png';
import img2 from '../images/bebida.png';
import img3 from '../images/roupa.png';
import img4 from '../images/tech.png';
import img5 from '../images/esporte.png';

class Carrousel extends React.Component {
  constructor() {
    super();
    this.state = {
      imgArray: [
        { img: img1, id: 'MLB1384' },
        { img: img2, id: 'MLB1403' },
        { img: img3, id: 'MLB1430' },
        { img: img4, id: 'MLB1000' },
        { img: img5, id: 'MLB1276' },
      ],
    };
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 500, // Tamanho da tela em que você deseja alterar as configurações
          settings: {
            slidesToShow: 1, // Quantidade de slides a serem mostrados no formato mobile
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 490,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ], // Permite arrastar para passar os slides
    };
    const { imgArray } = this.state;
    const { getProducts } = this.props;
    return (
      <Slider { ...settings } className="teste">
        {imgArray.map((ele) => (
          <button
            type="button"
            onClick={ getProducts }
            key={ ele.id }
            id={ ele.id }
          >
            <img
              key={ ele.id }
              src={ ele.img }
              alt={ ele.id }
              id={ ele.id }
              width="100%"
            />
          </button>
        ))}
      </Slider>
    );
  }
}

Carrousel.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

export default Carrousel;
