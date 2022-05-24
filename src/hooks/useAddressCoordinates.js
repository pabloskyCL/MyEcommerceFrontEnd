import React from 'react';
import { geocode } from '@esri/arcgis-rest-geocoding';
import { ApiKey } from "@esri/arcgis-rest-auth";

const useAddressCoordinates = address => {
   const [loading, setLoading] = React.useState(true);
   const [coordinates, setCoodinates] = React.useState([]);
   const apiKey = "AAPKffc737396d894498a9f9fa9672c327435nTObajDlh_7RdzrTB2pRSxSQ5aNRODFeuyeJzD9JEQRuY-Yod-vliqDO-smDoq-";
   const authenticator = new ApiKey({
      key: apiKey
   });
   let fetchError = false;

   function handleFetchError() {
      fetchError = true;
   }


   React.useEffect(() => {
      const  fetchData = () => {
            geocode({
               address,
               authentication: authenticator
            }).then(
               (response) => {
                  console.log(response.candidates[0])
                  setCoodinates([response.candidates[0].location.y,response.candidates[0].location.x]);
                  setLoading(false);
               }
            ).catch((error)=>{
               console.log(error);
               handleFetchError();
               setLoading(false);
            });
         }
       fetchData();

   }, [address]);

   return {
      fetchError,
      coordinates,
      loading,
   }

}

export default useAddressCoordinates;