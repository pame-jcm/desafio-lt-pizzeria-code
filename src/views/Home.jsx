import CarouselPrin from "../components/CarouselPrin";
import ModalCarrito from "../components/ModalCarrito";

import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { useContext,useState } from "react";
import { useNavigate } from 'react-router-dom';
import Context from '../Context';

const Home = () => {

    const navigate = useNavigate();
    const { carrito, setCarrito, totalCompra, setTotalCompra, listPizza } = useContext(Context);
    const [modalShow, setModalShow] = useState({showState:false, objPizza:{}});

    const addPizzaCarrito = async (id) => {

        const objPizza = listPizza.find(piz => piz.id === id);

        const arrayPizza = carrito.map(pizza => {
            if (pizza.objPizza.id === id) {
                pizza.cantidad = pizza.cantidad +1;
            }

            return pizza;
        });

        const pizzaCarrito = carrito.find(piz => piz.objPizza.id === id);

        pizzaCarrito ?? arrayPizza.push({objPizza: objPizza, cantidad: 1});

        const objArrayPizza = await arrayPizza.find(piz => piz.objPizza.id === id);

        setModalShow({showState:true, objPizza: objArrayPizza});        
        setCarrito(arrayPizza);
        
        setTotalCompra(totalCompra + objPizza.price);
    }

    const detailPizza = (id) => {
        try {
            navigate(`/pizza/${id}`);
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <CarouselPrin />

        <Container>
            <Row>
                {listPizza?.map((pizza, index) => (
                    <Col key={index} md={3} sm={3} className="d-flex justify-content-center">
                        <Card className="mt-4" style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={pizza.img} />
                            <Card.Body>
                            <Card.Title>{pizza.name}</Card.Title>
                            <hr />
                            
                                    {pizza.ingredients?.map((ingredients, ind) => (
                                        <Col key={ind} className="ms-4"> 🍕 {ingredients} </Col>
                                    ))}
                                <hr />
                                <Row>
                                    <Col className="d-flex justify-content-end"><h3>${pizza.price.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</h3></Col>
                                </Row>
                                <Row>
                                    <Col md={6} xs={6} className="d-flex justify-content-start">
                                        <Button variant="primary" onClick={() => detailPizza(pizza.id)}>Ver Más</Button>
                                    </Col>
                                    <Col md={6} xs={6} className="d-flex justify-content-end">
                                        <Button variant="danger" onClick={() => addPizzaCarrito(pizza.id)}>
                                            <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                                            Añadir
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    
        <ModalCarrito
            showState={modalShow.showState}
            pizza={modalShow.objPizza}
            onHide={() => setModalShow({showState:false, objPizza:{}})}
        />
    </>
  )
}

export default Home;