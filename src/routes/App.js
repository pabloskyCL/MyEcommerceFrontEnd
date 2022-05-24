import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../container/Home";
import Checkout from "../container/Checkout";
import Information from "../container/Information";
import Payment from "../container/Payment";
import Success from "../container/Success";
import NotFound from "../container/NotFound";
import Orders from "../container/Orders";
import Login from "../container/logIn";
import RegisterUserForm from "../container/RegistUserForm";
import useAddressCoordinates from "../hooks/useAddressCoordinates";

function App(
    {  
        addToCart,
        setState,
        getCart,
        state,
        removeFromCart,
        addToBuyer,
        addNewOrder, 
        emptingUserInfoAfterPayment,
        useHandleRegisterUser,
        useGetUserCredentials,
        isUserAuthenticated,
        authenticateError,
        setUser,
        getProducts
    }) {

    const routes = useRoutes([
        {
            path:'/',
            element: <Home state={state} isUserAuthenticated={isUserAuthenticated} getProducts={getProducts} getCart={getCart} setState={setState} addToCart={addToCart}/>

        },
        {
            path:'checkout',
            element: <Checkout state={state} removeFromCart={removeFromCart}/>
        },
        {
            path:'checkout/information',
            element:<Information state={state} addToBuyer={addToBuyer}/>
        },
        {
            path:'checkout/payment',
            element:<Payment state={state} addNewOrder={addNewOrder}/>,
        },
        {
            path:'checkout/success',
            element:<Success state={state} useAddressCoordinates={useAddressCoordinates} emptingUserInfoAfterPayment= {emptingUserInfoAfterPayment}/>
        },
        {
            path:'orders',
            element: <Orders state={state}/>
        },
        {
            path:'registerNewUser',
            element: <RegisterUserForm useHandleRegisterUser = {useHandleRegisterUser}/>
        },
        {
            path:'login',
            element: <Login useGetUserCredentials = {useGetUserCredentials} isUserAuthenticated = {isUserAuthenticated} setUser={setUser}/>
        },
        {
            path:'*',
            element:<NotFound />
        },
    ]);

    return routes;
    
}

export default App ;
