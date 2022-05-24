import React from 'react';
import '../styles/components/Orders.css';

function Orders({ state }) {
    const { orders } = state;
    console.log(orders);

    return (
        <div>
            { (orders.length > 0) ? orders.map((element) => (
                <div className='orders-content'>
                    <div className="order-item-header">
                        <span className='date-order'>
                            <span>order: {element.payment.id}</span>
                        </span>
                        <span className='add-to-cart-again'>
                            <span>agregar todo al carrito</span>
                        </span>
                    </div>
                    {
                        element.product.map((product) => (
                            <div className="order-product">
                                <div className="product-info">
                                    <div className="product-image">
                                        <img className='list-image' src={product.image} alt="" />
                                    </div>
                                    <div className="product-description">
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                                <div className="product-price">
                                    <h2>{product.price} $</h2>
                                </div>
                            </div>
                        ))}

                    <div className="order-total">
                    <span className='add-to-cart-again'>
                            <span>Total: {element.total_amount} $</span>
                        </span>
                    </div>
                </div>

            )): <h2>Esta muy solitario aqui ... no ha realizado pedidos</h2>}
        </div>
    )
}

export default Orders;