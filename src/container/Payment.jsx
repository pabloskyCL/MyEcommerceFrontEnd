import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import "../styles/components/Payment.css";


function Payment({ state, addNewOrder}) {
    const { cart, buyer } = state;
    const navigate = useNavigate();

    const paypalOptions = {
        clientId: "AU3tRQ6tGKSvGda94Y9SSxWqYWby_0cNQR1gpla7ZJBR0GoEqwVir6gHy6kGt-1t-2rLNR433xK_Y0KG",// colocar en un archivo env access tokens, usuarios y contranseñas por defecto
    }

    const sumTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        const sum = cart.reduce(reducer, 0);
        return sum;
    }




    const handlePaymentSuccess = (data) => {
        console.log(data.status);
        if (data.status === 'COMPLETED') {
            const newOrder = {
                buyer,
                product: cart,
                payment: data,
                total_amount: sumTotal()
            }
            addNewOrder(newOrder);
            navigate('/checkout/success');
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                {(cart.length === 0) && <Navigate to="/" />}
                <h2>Resumen del pedido</h2>
                {cart.map((product) => 
                    <div className="order-product" key={product.cartId}>
                    <div className="product-info">
                    <div className="product-image">
                    <img className='list-image' src={product.image} alt="" />
                    </div>
                    <div className="product-description">
                    <h3>{product.title}</h3>
                    </div>
                    </div>
                    <div className="product-price">
                    <h3>{product.price} $</h3>
                    </div>
                    </div>
                )}
                    <div className="total-amount">
                        <h3>Total a pagar: {sumTotal()} $</h3>
                    </div>

                {(cart.length !== 0) && <div className="Payment-button">
                    <PayPalButton
                        shippingPreference="NO_SHIPPING"
                        options={paypalOptions}
                        amount={sumTotal()}
                        onSuccess={(details, data) => {

                            handlePaymentSuccess(details);
                            console.log('data', data);
                        }}
                    />
                </div>}


            </div>
        </div>
    );
}

export default Payment;