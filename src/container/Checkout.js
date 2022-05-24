/* eslint-disable jsx-a11y/control-has-associated-label */
import React from "react";
import { Link } from 'react-router-dom';
import { AiTwotoneDelete } from 'react-icons/ai';
import "../styles/components/Checkout.css";

function Checkout({ state, removeFromCart }) {
    const { cart,buyer } = state;

    let nextStep = "/checkout/information";

    if(buyer.length > 0){
        nextStep = "/checkout/payment";
    }
    

    
    const handleRemoveToCart = product => {
        removeFromCart(product);
    }

    const sumTotal= () => {
        const reducer = (accumulator, currentValue) => accumulator + (parseInt(currentValue.price) * currentValue.cantidad);
        const sum = cart.reduce(reducer,0);
        return sum;
    }

    return (
        <div>
            { cart.length > 0 ? <h3>Lista de pedidos:</h3> : <h3>Sin pedidos</h3>}
        <div className="Checkout">
            <div className="Checkout-content">
                {cart.map( (product) => (
                    <div className="order-product" key={product.cartId}>
                    <div className="product-info">
                        <div className="product-image">
                            <img className='list-image' src={product.image} alt="" />
                        </div>
                        <div className="product-description">
                            <h3>{product.title}</h3>
                        </div>
                        <div className="product-quantity"><h3>Cantidad: {product.cantidad}</h3></div>
                    </div>
                    
                    <div className="product-price">
                        <h2>{product.price} $</h2>
                        <button className="delete-button" type="button" onClick={() => handleRemoveToCart(product.id)}><AiTwotoneDelete size="20px"/></button>
                    </div>
                    </div>
                    ))}
            </div>
              { cart.length > 0 &&
            <div className="Checkout-sidebar">
                <h3>{`Total a pagar:$${sumTotal()}`}</h3>
                <Link to={nextStep}>
                    <button type="button">Continuar Pedido</button>
                </Link>
            </div>}
        </div>
        </div>
    );
}

export default Checkout;