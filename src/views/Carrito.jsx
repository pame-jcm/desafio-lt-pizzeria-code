import { Container, ListGroup, Button } from 'react-bootstrap';
import { useContext } from 'react';
import Context from '../Context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'

const Carrito = () => {

    const { carrito, setCarrito, totalCompra, setTotalCompra, listPizza } = useContext(Context);
    
    const addPizzaCarrito = (id) => {
        const objPizza = listPizza.find(piz => piz.id === id);
        let total = 0; 
        
        const arrayPizza = carrito.map(pizza => {
            if (pizza.objPizza.id === id) {
                pizza.cantidad = pizza.cantidad +1;
                total = totalCompra + pizza.objPizza.price;
            }

            return pizza;
        });
        

        const pizzaCarrito = carrito.find(piz => piz.objPizza.id === id);

        pizzaCarrito ?? arrayPizza.push({objPizza: objPizza, cantidad: 1});
        
        setCarrito(arrayPizza);
        setTotalCompra(total);
    }

    const deletePizzaCarrito = (id) => {

        let total = 0;        
        let arrayPizza = carrito.map(pizza => {
            if (pizza.objPizza.id === id && pizza.cantidad > 0) {
                pizza.cantidad = pizza.cantidad - 1;
                total = totalCompra - pizza.objPizza.price;
            }

            return pizza;
        });

        setCarrito(arrayPizza.filter(pizza => pizza.cantidad > 0));
        setTotalCompra(total);
    }


  return (
    <>
        <Container>
            <strong><h4>Detalles del Pedido:</h4></strong>
            
            <ListGroup as="ol" className='ms-5 me-5'>
                {carrito.length > 0 ? carrito.map(pizza => (
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-end"
                        key={pizza.objPizza.id}
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{pizza.objPizza.name}</div>
                            <strong>Ingredientes:</strong> {pizza.objPizza.ingredients.reduce((acu, ingredients) => `${acu} ${ingredients},`,'')}
                        </div>

                        <div className='ms-2 me-3'>
                            Valor: <strong>${pizza.objPizza.price.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</strong>
                        </div>

                        <Button variant="primary" onClick={() => deletePizzaCarrito(pizza.objPizza.id)}>-</Button>
                        <h6 className='ms-3 me-3'>{pizza.cantidad}</h6>
                        <Button variant="danger" onClick={() => addPizzaCarrito(pizza.objPizza.id)}>+</Button>

                        <div className='ms-2 me-3'>
                            <strong>${(pizza.objPizza.price * pizza.cantidad).toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</strong>
                        </div>
                    </ListGroup.Item>
                )) : <h4 className="text-center">
                        <FontAwesomeIcon icon={faCartArrowDown} className='me-3'/>
                        Carrito Vacío
                    </h4> }
            </ListGroup>
            <div className='d-flex flex-column align-items-end p-5'>
                <h3>Total Compra: ${totalCompra.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</h3>
                <Button variant="success">Ir a Pagar</Button>
            </div>
        </Container>
    </>
  )
}

export default Carrito