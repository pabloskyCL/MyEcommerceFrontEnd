import axios from "axios";
import React from "react";

function useShoppingCart(){
    
    const addToCart = (product,userId) => {
        const data = {product:product,
            userId:userId};
        return axios.post('',{data}).then( response =>{ 
            const {isAddProduct,product} = response.data;
            if(isAddProduct){
                return product;  
            }
        })
    }

    return {
        addToCart
    }
}

export default useShoppingCart;