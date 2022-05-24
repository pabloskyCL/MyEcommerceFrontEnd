import React from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/Information.css';
import useValidateInformation from "../hooks/useValidateInformation";

function Information({ state, addToBuyer }) {
    const form = React.useRef(null);
    const { cart } = state;
    const navigate = useNavigate();
    
    let successData;
    let errors = {'name': "",
                  'email': "",
                  'direction': "",
                  'city': "",
                  'country': "",
                };
                
    const handleSummit = () => {
        const formData = new FormData(form.current);
        ({successData, errors} = useValidateInformation(formData));
        if (successData) {
            const buyer = {
                'name': formData.get('name'),
                'email': formData.get('email'),
                'address': formData.get('direction'),
                'depto': formData.get('depto'),
                'city': formData.get('city'),
                'country': formData.get('country'),
                'state': formData.get('state'),
                'postal-code': formData.get('postal-code'),
                'phone': formData.get('phone'),
            }
            addToBuyer(buyer);
            navigate('/checkout/payment');
        }else{
            ReactDOM.render(errors.name,document.getElementById('name-error'));
            ReactDOM.render(errors.email,document.getElementById('email-error'));
            ReactDOM.render(errors.direction,document.getElementById('direction-error'));
            ReactDOM.render(errors.city,document.getElementById('city-error'));
            ReactDOM.render(errors.country,document.getElementById('country-error'));
        }
    }

    const sumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }

    return (
        <div className="Information">
            <div className="Information-content">
                <div className="Information-head">
                    <h2>Informacion de contacto</h2>
                </div>
                <div>
                    <div className="Information-form">
                        <form ref={form}>
                            <span id="name-error">{errors.name}</span>
                            <input type="text" placeholder="Nombre Completo" name="name" />
                            <span id="email-error">{errors.email}</span>
                            <input type="email" placeholder="Correo Electronico" name="email" />
                            <span  id="direction-error">{errors.direction}</span>
                            <input type="text" placeholder="Dirección" name="direction" />
                            <input type="text" placeholder="Depto" name="depto" />
                            <span id="city-error">{errors.city}</span>
                            <input type="text" placeholder="Ciudad" name="city" />
                            <span id="country-error">{errors.country}</span>
                            <input type="text" placeholder="Pais" name="country" />
                            <input type="text" placeholder="Estado" name="state" />
                            <input type="text" placeholder="Telefono" name="phone" />
                            <input type="text" placeholder="Codigo Postal" name="postal-code" />
                        </form>
                    </div>
                </div>

                {cart.length > 0 ?
                    <div className="Information-buttons">
                        <div className="Information-back">
                            <Link to="/checkout">
                                Regresar
                            </Link>
                        </div>
                        <div className="Information-next">
                            <button type="button" onClick={handleSummit}>Pagar</button>
                        </div>
                    </div> : <div> <h4>no hay pedidos llene el carrito previamente</h4> </div>}

            </div>

            <div className="Information-sidebar">
                <h3>Pedido</h3>
                {cart.length > 0 ? cart.map(product =>
                    <div className="Information-item" key={product.cartId}>
                        <div className="Information-element">
                            <h4>{product.title}</h4>
                            <span>${product.price}</span>
                        </div>
                    </div>) : <div><h4>No hay productos que comprar</h4></div>}
                <div className="total"><h4>Total: ${sumTotal()}</h4></div>
            </div>
        </div>
    );
}

export default Information;