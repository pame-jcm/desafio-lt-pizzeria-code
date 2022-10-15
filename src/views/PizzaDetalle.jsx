import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import ModalCarrito from '../components/ModalCarrito';
import Context from '../Context';

const PizzaDetalle = () => {

    const { id } = useParams();
    
    const { listPizza, carrito, setCarrito } = useContext(Context);
    const [modalShow, setModalShow] = useState({showState:false, objPizza:{}});
    const pizza = listPizza.find(pizza => pizza.id === id);
    
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

    }
    
    
  return (
    <>

        <Container>
            <Card className="m-4">
            <Card.Body>
                
                <Row>
                    <Col xs={4}><Card.Img variant="top"  src={pizza?.img} style={{ width:'18rem'}}/></Col>
                    <Col>
                        <Row> <strong>{pizza?.name}</strong> </Row>
                        <hr />
                        <Row className='mb-3'> {pizza?.desc}</Row>
                        <Row><strong>Ingredientes:</strong></Row>
                        {pizza?.ingredients?.map((ingredients, ind) => (
                            <Row key={ind} className='ms-3'> 🍕 {ingredients}</Row>
                        ))}
                        <Row className='mt-3'><strong><h3>Precio: ${pizza?.price.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</h3></strong></Row>
                    </Col>
                </Row>
                
            </Card.Body>
            <Card.Footer className="text-muted">
                <Button variant="danger" onClick={() => addPizzaCarrito(id)}>
                <FontAwesomeIcon icon={faCartPlus} className='me-1' />
                    Añadir
                </Button>
            </Card.Footer>
            </Card>
        </Container>
        <ModalCarrito
            showState={modalShow.showState}
            pizza={modalShow.objPizza}
            onHide={() => setModalShow({showState:false, objPizza:{}})}
        />
    </>
  )
}

export default PizzaDetalle