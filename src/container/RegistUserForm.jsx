import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/RegisterForm.css';

function registUserForm({useHandleRegisterUser}) {

    const form = React.useRef(null);
    
    let errors = {'firstName': "",
                  'lastName': "",
                  'email': "",
                  'password': "",
                  'direction': "",
                  'region':"",
                  'comuna':"", 
                };
                
    const handleSummit = React.useCallback(() => {
        const formData = new FormData(form.current);
            const buyer = {
                'first_name': formData.get('firstName'),
                'last_name': formData.get('lastName'),
                'email': formData.get('email'),
                'password': formData.get('password'),
                'shipping_address': formData.get('direction')+', '+formData.get('region')+', '+formData.get('comuna'),
                'postal_code': formData.get('postal-code'),
            }
            console.log(buyer);

            
            useHandleRegisterUser(buyer);
    })

    return(
        <div className="registerUser">
            <div className="registerUser-content">
                <div className="info-head">
                    <h2>Registrate en PlatziConf !</h2>
                </div>
                <div>
                    <div className="registerUser-form">
                        <form ref={form}>
                            <span id="firtsName-error">{errors.firstName}</span>
                            <input type="text" placeholder="Nombre" name="firstName" />
                            <span id="lastName-error">{errors.lastName}</span>
                            <input type="text" placeholder="Apellido" name="lastName" />
                            <span id="email-error">{errors.email}</span>
                            <input type="email" placeholder="Correo Electronico" name="email" />
                            <span id="email-error">{errors.email}</span>
                            <input type="password" placeholder="contraseña" name="password" />
                            <span  id="password-error">{errors.password}</span>
                            <input type="text" placeholder="Dirección" name="direction" />
                            <span id="region-error">{errors.Region}</span>
                            <input type="text" placeholder="Región" name="region" />
                            <span id="comuna-error">{errors.comuna}</span>
                            <input type="text" placeholder="comuna" name="comuna" />
                            <input type="text" placeholder="Codigo Postal" name="postal-code" />
                        </form>
                    </div>
                </div>

                    <div className="logIn-buttons">
                        <div className="logIn-back">
                            <Link to="/login">
                                Log In
                            </Link>
                        </div>
                        <div className="Information-next">
                            <button type="button" onClick={handleSummit}>Registrarse</button>
                        </div>
                    </div>

            </div>
        </div>
    );
}

export default registUserForm;