import React from "react";
import useTestSymfonyApi from "../hooks/useTestSymfonyApi";



function testSymfony(){
   
    const {test,error,loading} =  useTestSymfonyApi()

    return (
        <div className="testSymfony">
        <div>{ loading ? <h1>cargando</h1> : test }</div>
        </div>
    );
}

export default testSymfony;