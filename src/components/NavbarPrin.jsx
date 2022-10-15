import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Context from '../Context';
import { useContext } from 'react';

const NavbarPrin = () => {

  const setActiveClass = ({isActive}) => (isActive ? 'activeNav' : 'non-activeNav');
  const { totalCompra } = useContext(Context);

  return (
    <Navbar bg="gris" expand="lg">
      <Container>
        <Navbar.Brand>
            <NavLink className={ setActiveClass } to="/home" style={{ textDecoration:'none', padding:'9px' }}>
            🍕 Pizzeria Mamma Mia!
            </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1">
                <NavLink className={ setActiveClass } to="/carrito" style={{ textDecoration:'none', padding:'9px' }}>
                  <h5> 🛒 <strong> ${totalCompra.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1.')} </strong> </h5> 
                </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarPrin