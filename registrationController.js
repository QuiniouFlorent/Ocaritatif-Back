import debug from 'debug';
const logger = debug('app:controller');
import { registrationDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';
import { sendMail } from '../service/mail/resetPassword.js';
import APIerror from '../service/error/APIerror.js';

const registrationController = {

    async getAllRegistration( req, res, next ) {

        logger('Registration getAll Controller called');
        const { result, error } = await registrationDatamapper.findAllregistration();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createRegistration( req, res, next ) {

        logger('Registration create controller called');
        const newRegistration = req.body;
        const { result, error } = await registrationDatamapper.insertRegistration(newRegistration);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async askRegistration( req, res, next ) {

        logger('Ask registration controller called');
        let result ;
        let error;
        const mail = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const event = req.body.event;
        const date = req.body.date;
        const subject = `Demande d\'inscription à l\'événement : ${event} du ${date}`;
        const text = `Votre demande d\'inscription pour ${event} du ${date} va être prise en compte.\n
        Merci d'attendre notre retour validant votre inscription.`;
        const text2 = `Demande d'inscription à l'événement : ${event} du ${date}\n
        Nom : ${lastname}\n
        Prénom: ${firstname}\n
        Mail: ${mail} `

        try {
            result = await Promise.all([
                sendMail(mail, subject, text),
                sendMail(process.env.GMAIL_ADRESS, subject, text2)
                ]);

        } catch(err) {
            error = new APIerror(err, 500);

        } finally {
            controllerUtil.manageResponse(error, result, res, next);
        }
        
    },

    async updateRegistration( req, res, next ) {

        logger('Registration modify controller called');
        const id = req.params.id;
        const registrationModified = req.body;
        const { result, error } = await registrationDatamapper.modifyRegistration(id, registrationModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeRegistration( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await registrationDatamapper.deleteRegistration(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default registrationController;