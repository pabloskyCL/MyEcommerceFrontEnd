import React from "react";
import axios from 'axios';


function useTestSymfonyApi(){
    const [test,setTest] = React.useState('');
    const [error,setError] = React.useState('');
    const [loading, setLoading] =React.useState(true);

    React.useEffect(()=>{
        const fetchData = async ()=>{  await axios.get('http://localhost:8080/testSymfonyApi').then((response)=>{
            console.log(response);
            setTest(response.data.test);
            setLoading(false);
        }).catch(error => setError(error));
        };
        fetchData();
    },[test]);

    return {test,error,loading};


}

export default useTestSymfonyApi;