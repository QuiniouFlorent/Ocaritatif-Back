import debug from 'debug';
import APIerror from '../service/error/APIerror.js';
import controllerUtil from '../service/util/controller.js';
import { sendMail } from '../service/mail/resetPassword.js';
const logger = debug('app:controller');

const contactusController = {

    async contactus( req, res, next ) {

        logger('Contact Us Controller called');
        let result;
        let error;
        const mail = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const message = req.body.message;
        const subject = 'Demande de contact';
        const text = `Nous avons bien reçu votre demande de contact Mr/Mme ${lastname} ${firstname}, dont le message est le suivant :
        " ${message} ".
        Nous reviendrons vers vous prochainement . Cordialement `;
        const text2 = `Demande de contact reçue :
        Nom : ${lastname} ,
        Prénom : ${firstname} ,
        Email : ${mail} ,
        Message : ${message} `

        try {
            result = await Promise.all([
                sendMail(mail, subject, text),
                sendMail(process.env.GMAIL_ADRESS, subject, text2)
            ]);

        } catch(err) {
            error = new APIerror(err, 500);
        }
        finally {
            controllerUtil.manageResponse(error, result, res, next);
        }
    }
}

export default contactusController;