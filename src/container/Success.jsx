import React from "react";
import { Navigate } from "react-router-dom";
import {MapContainer, TileLayer,Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet';
import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';
import "../styles/components/Success.css";
import useEmailer from "../hooks/useEmailer";

function Success( { state, useAddressCoordinates,emptingUserInfoAfterPayment } ) {
    const { buyer,orders } = state;
    const accessToken = 'pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ';// colocar en un archivo env access tokens, usuarios y contranseñas por defecto
    const [loadingEmptyUserInfo,setEmptyUserInfo] = React.useState(true);
    // let loading;
    // let coordinates;
    // let emailStatus;
    // let loadingEmail;    

    console.log(orders);
    console.log(buyer);

    const { coordinates, loading, fetchError } = useAddressCoordinates(buyer[0] ? buyer[0].address: null);
    const { errorFechingEmail, loadingEmail} =  useEmailer(orders, buyer[0] ? buyer[0].email: null);
    console.log(fetchError," ",errorFechingEmail);
        
       React.useEffect(() => {
     
        const aux = async() => {
            await emptingUserInfoAfterPayment();
            setEmptyUserInfo(false);
         }
            aux();
       },[loadingEmptyUserInfo]); 
    
    const myMarker =  Leaflet.icon({
        iconUrl: icon,
        shadowUrl: shadowIcon,
        iconSize: [38,38],
        shadowSize:[38,38]
    });

    
    
    
    return (
        <div className="Success">
            {
            <div className="Success-content">
                <h2>gracias por tu compra</h2>
                <span> Tu pedido llegara en 3 dias a tu dirección</span>
                <div className="Success-map">
                   {loading || loadingEmail || loadingEmptyUserInfo ? <h2>cargando</h2>: <MapContainer center={coordinates}
                    zoom={13}
                    style={{width: '800px', height:'400px'}}
                    >
                        <TileLayer 
                        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGFibG9za3ljbCIsImEiOiJja3p4YTI5aDQwOHBjMm5wNHpjbDFwbXB3In0.whxmHO9518rfLL_oHVMeaQ"// colocar en un archivo env access tokens, usuarios y contranseñas por defecto
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        maxZoom= {20}
                        id = 'mapbox/streets-v11'
                        accessToken={accessToken}
                        />
                        <Marker position={coordinates}
                         icon = {myMarker}>
                            <Popup>
                                mi Casa
                            </Popup>
                        </Marker>
                    </MapContainer>
                    }
                </div>
            </div>
            }
        </div>
    )
}

export default Success;