import React from "react";
import '../styles/components/Products.css';

function Products({ state, render }) {
    const { products } = state;
    return(
        <div className="Products">
            <div className="Products-items">
                {products.map( product => (
                    render(product)
                ))}
            </div>
        </div>
    );
}

export default Products;