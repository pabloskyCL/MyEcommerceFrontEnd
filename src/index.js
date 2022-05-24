import React from 'react';
import reactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Footer from './component/Footer';
import Header from './component/Header';
import App from './routes/App';
import useInitialState from './hooks/useInitialState';
import {useAuthValidations} from './hooks/useAuthValidations';
import './styles/components/Layout.css';



function RenderComponents() {
    
    const {
        addToCart,
        setState,
        getCart,
        state,
        addToBuyer,
        addNewOrder,
        removeFromCart,
        emptingUserInfoAfterPayment,
        getProducts
    } = useInitialState(token);

    const {
        token,
        user,
        setUser,
        useGetUserCredentials,
        useHandleRegisterUser,
        isUserAuthenticated,
        authenticateError,
        logout
    } = useAuthValidations();

    return(
        <BrowserRouter>
            <Header state={state} isUserAuthenticated={isUserAuthenticated} setUser = {setUser} user={user} setState={setState}/>
            <div className="Main">
                <App 
                    addToCart = {addToCart}
                    setState = {setState}
                    getCart = {getCart}
                    state={state}  
                    removeFromCart ={removeFromCart}
                    addNewOrder = {addNewOrder} 
                    addToBuyer = {addToBuyer}
                    emptingUserInfoAfterPayment = {emptingUserInfoAfterPayment}
                    useGetUserCredentials = {useGetUserCredentials}
                    useHandleRegisterUser = {useHandleRegisterUser}
                    isUserAuthenticated = {isUserAuthenticated}
                    authenticateError = {authenticateError}
                    setUser = {setUser}
                    getProducts = {getProducts}
                    />
            <Footer/>
            </div>
        </BrowserRouter> 
        
    );
}

reactDOM.render(
<RenderComponents />
, document.getElementById('app'));
