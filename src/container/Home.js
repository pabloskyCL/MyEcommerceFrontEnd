import axios from "axios";
import React from "react";
import Product from "../component/Product";
import Products from "../component/Products";

function Home( { state, isUserAuthenticated,getProducts,getCart,setState, addToCart}) {
    const [user, setUser] = React.useState(null);

    React.useEffect(()=>{
        const userAuth =  isUserAuthenticated();
        const products = getProducts();
        const cart =  getCart();
        Promise.allSettled([userAuth,products,cart]).then(((results)=>{
            let cart = [];
            const products = results[1].value.data;
            
            if(results[2].status == 'fulfilled'){
                cart = results[2].value.data;
            }

            setState({
                ...state,products: products,cart: cart
            });
            
            if(results[0].status == 'fulfilled'){
                let currentUser = results[0].value;
                setUser(currentUser);
            }
        })).catch((error) => {
            console.log(error);
        })
    },[]);
    
    
    return (  <Products state={state} render={ product =>(
        <Product key={product.id} product={product} user = {user} addToCart ={addToCart}/>
    )} />
        );
}

export default Home;