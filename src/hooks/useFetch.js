import { useEffect,useState } from "react";
import axios from "axios";

export default function useGetFetch(url){
const [data,setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() =>{ 
    async function fetch() {
        try{
            setLoading(true);
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            };
            const response = await axios.get(url,config);
            setData(response.data);
        }catch(err){
            setError(err);
        }finally{
            setLoading(false);
        }
    }

    fetch();
},[url])

    return {data,loading,error};
}