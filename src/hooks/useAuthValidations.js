import {useState} from "react";
import axios from 'axios';

export function useAuthValidations() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    
   const useHandleRegisterUser = formData => {
        console.log(formData);
        const fetchData = async () => {
            await axios.post('http://localhost:8080/api/register', formData).then((response) => {
                console.log(response);
            }).catch(error => console.log(error));
        };
        fetchData();
    }

   const useGetUserCredentials = async (credentials)  => {
            return await axios.post('http://localhost:8080/api/login', credentials).then((response) => {
            const Returntoken = response.data.token
                localStorage.setItem('token', Returntoken);
                return { Returntoken };
            });

        };

    const isUserAuthenticated = async() => {
       
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        return await axios.get('http://localhost:8080/api/profile',config).then((response)=>{
            let currentUser =  JSON.parse(response.data.user);
            setUser(currentUser);
            return currentUser;
        }).catch(() => {
            setUser(null);
        })
        
        
    }

    const logout = () => {
      
        return user;
    } 

    return {
        user,
        setUser,
        useGetUserCredentials,
        useHandleRegisterUser,
        isUserAuthenticated,
        authenticateError:error,
        logout
    };
};

