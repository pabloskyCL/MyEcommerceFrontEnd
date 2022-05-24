import React from "react";
import {v4 as uuidv4} from 'uuid';

function Product({ product, user, addToCart }) {

    const handleAddToCart = item => {
        const idCart = uuidv4();
        const newProduct = {...item,cartId: idCart,cantidad:0}
        if(user){
            addToCart(newProduct);
        }else{
            return alert('tienes que estar logeado para comprar ');
        }
        
    }

    return(
        <div className="Products-item">
            <img src={product.image} alt={product.title} />
            <div className="Product-item-info" >
                <h2>
                    {product.title}
                    <span>$ {product.price}</span>                
                </h2>
               <p>{product.description}</p>
            </div>
            <button type="button" onClick={() => handleAddToCart(product)}> Comprar</button>
        </div>
    );
}

export default Product;