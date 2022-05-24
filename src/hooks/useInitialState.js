import axios from "axios";
import React from "react";
import initialState from '../initialState';

function useInitialState() {

    const [state, setState] = React.useState(initialState);
    
        const getProducts = async () => {
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }
            return await axios.get('http://localhost:8080/products/ListProducts',config)
               
        }
        

    const setCart = async (data) => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        return await axios.post('http://localhost:8080/api/addToCart',data,config);
    }
    const getCart = async () => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        return await axios.get('http://localhost:8080/api/getCart',config)
    } 

    const updateProductQuantity = async (product) =>{
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await axios.post('http://localhost:8080/api/updateProductQuantity',product,config);
    }
        
    const addToCart = (payload) => {
        // TODO llevar esta logica al backend;
        const isCartEmpty = (state.cart.length > 0) ? false : true;
        const isProductExist = state.cart.map((product) => {return product.id}).includes(payload.id);

        if(isProductExist){
            state.cart.map(product => {
                if(product.id==payload.id){
                    const fetchData = {id:product.id,cantidad:1};
                    updateProductQuantity(fetchData).then((response) => {
                        getCart().then((response)=>{
                            setState({
                                ...state, cart: response.data
                            });
                        })
                    });
                    
                }
            });
        }else{
            payload.cantidad++;
            setCart(payload).then((response)=>{
                getCart().then((response)=>{
                    setState({
                        ...state, cart: response.data
                    });
                })
            });
        }
        
    }
    
    const removeFromCart = async payload => {
        
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await axios.post('http://localhost:8080/api/deleteProduct',payload,config).then((response)=> {
            console.log(response);
            return response;
        }).then((response) => {
            getCart().then((res) => {
                setState({
                    ...state,
                    cart: res.data
                });   
            })
        });
            
    }

    
    const emptingUserInfoAfterPayment = () => {
        setState({
            ...state,orders:[],buyer:[]
        });

    }


    const addToBuyer = payload => {
        setState({...state,buyer: [...state.buyer,payload]})
    }

    const addNewOrder = payload => {
        setState({
            ...state,
            orders:[...state.orders,payload]
        })
    }

    return (
        {
        addToCart,
         setState,
         getCart,
         getProducts,
         addToBuyer,
         addNewOrder,
         removeFromCart,
         state,
         emptingUserInfoAfterPayment
        }  
    );

};

export default useInitialState;