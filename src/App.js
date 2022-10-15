
import Context from './Context';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import NavbarPrin from './components/NavbarPrin';
import { useEffect, useState } from 'react';
import Home from './views/Home';
import PizzaDetalle from './views/PizzaDetalle';
import NotFound from './views/NotFound';
import Carrito from './views/Carrito';

function App() {
  const [carrito, setCarrito] = useState([]);
  const [listPizza, setListPizza] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  const endPoint = '/pizzas.json';

  useEffect(() => {
    const getPizzas = async () => {
        try {
            const res = await fetch(endPoint);
            const data = await res.json();

            setListPizza(data);
        } catch (error) {
            console.log(error);
        }
    };
    getPizzas();
}, []);

  return (
    <div className="App">
      <Context.Provider value={{carrito, setCarrito, totalCompra, setTotalCompra, listPizza}}>
        <BrowserRouter>
            <NavbarPrin />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/desafio-lt-pizzeria" element={<Home />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/pizza/:id" element={<PizzaDetalle />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </Context.Provider>      
    </div>
  );
}

export default App;
