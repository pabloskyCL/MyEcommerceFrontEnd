import axios from "axios";
import React from "react";



function useEmailer(orders, email) {
    const [emailStatus, setEmailStatus] = React.useState("cargando");
    const [loadingEmail, setLoading] = React.useState(true);
    const [errorFechingEmail, setFechingEmail] = React.useState(false);

    React.useEffect(() => {

        const sendEmail = async () => {
            await axios.get("http://localhost:3500/sendEmail/", { params: { orders, email } }).then((response) => {
                console.log(response);
                setEmailStatus(response.data.success);
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setFechingEmail(true);
            })
        }
        sendEmail();
    }, [email,orders]);

    return { errorFechingEmail,emailStatus, loadingEmail };
}


export default useEmailer;


// 653215776220-2fr145a7h11i6ejppiuj976n0uacpm0m.apps.googleusercontent.com
// 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

