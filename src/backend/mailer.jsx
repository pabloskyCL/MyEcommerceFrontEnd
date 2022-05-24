const { google } = require('googleapis');
const cors = require('cors');
const nodemailer = require('nodemailer');
const express = require('express');
const handlebars = require('nodemailer-express-handlebars');
const path = require('path');

const app = express();
const port = 3500; // TODO dejar variables estaticas de configuración ,Api keys , accesTokens etc en un archivo de configuración
const clientID = "653215776220-2fr145a7h11i6ejppiuj976n0uacpm0m.apps.googleusercontent.com";
const clientSecret = "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";
const redirectUri = "https://developers.google.com/oauthplayground";
const refreshToken = "1//04c34_DJvAzAgCgYIARAAGAQSNwF-L9IrhT9e6vt1oPYMLjK_b1dqGSkyHGegI9XmNr1ZEuhBzyAewJLJdhWrNuY8vaz_LiKawNM";
const oauth2Client = new google.auth.OAuth2(clientID,clientSecret,redirectUri);
oauth2Client.setCredentials({refresh_token:refreshToken});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function sendEmail(email, order){
    let result;
    try {
        const accessToken = await oauth2Client.getAccessToken();
        const transport = nodemailer.createTransport(
                    {
                        service: "gmail",
                        port: 465,
                        auth: {
                            type: "OAuth2",
                            user: "myecomerceproject@gmail.com",
                            clientId: clientID,
                            clientSecret,
                            refreshToken,
                            accessToken,
                        }
                    }
                );
            
        transport.use('compile', handlebars({
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('./Templates'),
                defaultLayout:false
            },
            viewPath: './Templates/',
            extName:'.handlebars'
        }))
        

        const mailOptions = 
            {
                from:"p.quirozh@duocuc.cl",
                to:email,
                subject: "tu orden se procesado con exito!",
                template:'emailOrderConfirm',
                context: {
                    product: order.product
                }
            };

            result = await transport.sendMail(mailOptions);
            
        
    } catch (error) {
        console.log(error);
    }

    return result;
}



app.get("/sendEmail", async (req, res) => {
    try {
       
        const {email} = req.query;
        const orders = JSON.parse(req.query.orders[0]);
        console.log(email);
        console.log(orders.product);
        sendEmail(email, orders).then(() => res.status(200)).catch((error)=> console.log(error.message));
    console.log("requested");
    res.send({success: "funcionaa!"});
    } catch (error) {
        console.log(error);
    }
    
})



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})