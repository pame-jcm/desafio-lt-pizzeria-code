import { Modal, Button } from 'react-bootstrap';
import Context from '../Context';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const ModalCarrito = ({pizza, showState, onHide}) => {

    const { carrito, setCarrito, listPizza, totalCompra, setTotalCompra } = useContext(Context);
    const setActiveClass = ({isActive}) => (isActive ? 'activeNav btn btn-danger' : 'non-activeNav btn btn-danger');

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
    <Modal
      show={showState}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ira directo a tu Carro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{pizza?.objPizza?.name}</h4>
        <div className="d-flex justify-content-between align-items-end">
            <div className="ms-2 me-auto">
                    
                <strong>Ingredientes:</strong> {pizza?.objPizza?.ingredients.reduce((acu, ingredients) => `${acu} ${ingredients},`,'')}
            </div>

            <div className='ms-2 me-3'>
                Valor: <strong>${pizza?.objPizza?.price.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</strong>
            </div>

            <Button variant="primary" onClick={() => deletePizzaCarrito(pizza.objPizza.id)}>-</Button>
            <h6 className='ms-3 me-3'>{pizza.cantidad}</h6>
            <Button variant="danger" onClick={() => addPizzaCarrito(pizza.objPizza.id)}>+</Button>

            <div className='ms-2 me-3'>
                <strong>${(pizza?.objPizza?.price * pizza?.cantidad).toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</strong>
            </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Seguir Comprando</Button>
        <NavLink className={setActiveClass} to="/carrito">Ir al Carro</NavLink>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCarrito