
function useValidateInformation(formData) {
    let successData = true;
    const errors = {};
    
        if (!formData.get('name')) {
            successData = false;
            errors.name = "debe ingresar un nombre";
        }
        
        if(!formData.get('email')){
            successData = false;
            errors.email = "debe ingresar un email";
        }

        if(!formData.get('direction')){
            successData = false;
            errors.direction = "debe ingresar una dirección";
        }

        if(!formData.get('city')){
            successData = false;
            errors.city = "debe ingresar su ciudad";
        }

        if(!formData.get('country')){
            successData = false;
            errors.country = "debe ingresar su país";
        }
        console.log(errors);
    return {successData,errors};
}


export default useValidateInformation;