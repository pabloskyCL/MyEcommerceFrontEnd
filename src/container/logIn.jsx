import React from "react";
import { Navigate,useNavigate } from 'react-router-dom';

function logIn({useGetUserCredentials,isUserAuthenticated,setUser} ) {
    const [loading, setLoading] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);
    const [error, setError] = React.useState({messageError:''});
    const navigate = useNavigate();

    const form = React.useRef(null);
         
    React.useEffect(()=>{  
        setLoading(true);
        isUserAuthenticated().then((user)=>{
            if(!user){
                setLoading(false);
                return;
                
            }else{  
                setLoading(false);
                navigate('/');

            }
        }).catch((err) => {
            setError({messageError: 'ingrese usuario y contraseña para iniciar sesión'})
            setLoading(false);
            setUser(null);
        });
    },[]);

    const handleSubmit = () => {
        setLoading(true);
        const formData = new FormData(form.current);
        const credentials = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        useGetUserCredentials(credentials).then((token)=> {
            if(token){
                setRedirect(true);
            }
            setLoading(false);
        }).catch(()=>{
            setError({messageError:'usuario y contraseña invalidos'});
            setLoading(false);
        });     
    
        // validateUser.then((response)=>{
        //     let responseUser = JSON.parse(response.data.user);
        //     console.log(responseUser);
        // })  
    };

    if (redirect) {
        return (<Navigate to="/" />);
    }


    return (

        <div>
            {error.messageError}
            <br></br>
            <br></br>
            {loading ? <h1>loading ... </h1> : <form ref={form}>
                <div>
                    <div>
                        <label htmlFor="email">email</label>
                        <input id="email" name="email" type="text" />
                    </div>
                    <div>
                        <label htmlFor="password">contraseña</label>
                        <input id="password" type="password" name="password" />
                    </div>
                    <div>
                        <button onClick={handleSubmit}>log in</button>
                    </div>
                </div>
            </form>
            }

        </div>
    );
}

export default logIn;