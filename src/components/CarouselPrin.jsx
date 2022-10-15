import { Carousel } from 'react-bootstrap';
import Carousel1 from '../assets/img/carousel_pizza_1.jpg';
import Carousel2 from '../assets/img/carousel_pizza_2.jpg';
import Carousel3 from '../assets/img/carousel_pizza_3.jpg';

const CarouselPrin = () => {
    
  return (
    <>
        <Carousel>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Carousel1}
                alt="First slide"
                height="300px"
                style={{filter: 'brightness(40%)'}}
                />
                <Carousel.Caption>
                <h3>Pizzas Caseras</h3>
                <p>Nuestro mejor secreto en pizzas: Ingredientes de felicidad y toques de alegría.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Carousel2}
                alt="Second slide"
                height="300px"
                style={{filter: 'brightness(40%)'}}
                />

                <Carousel.Caption>
                <h3>Pizzas con Aroma</h3>
                <p>Trozos perfectos, precios perfectos, pizzas perfectas.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={Carousel3}
                alt="Third slide"
                height="300px"
                style={{filter: 'brightness(40%)'}}
                />

                <Carousel.Caption>
                <h3>Somos auténticos en sabor.</h3>
                <p> Una buena pizza sabe mejor en compañía de amigos.</p>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
    </>
  )
}

export default CarouselPrin