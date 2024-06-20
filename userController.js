import debug from 'debug';
const logger = debug('app:controller');
import { userDatamapper } from '../datamapper/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import controllerUtil from '../service/util/controller.js';
import APIerror from '../service/error/APIerror.js';
import { resetToken, sendMailReset } from '../service/mail/resetPassword.js';


const userController = {
    async getAllUser( req, res, next ) {

        logger('user getAll controller called');
        const { result, error } = await userDatamapper.findAllUser();

        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneUser( req, res, next ) {

        logger('user getOne controller called');
        const id = req.params.id;
        const { result, error } = await userDatamapper.findOneUser(id);

        controllerUtil.manageResponse(error, result, res, next);
    },

    async getRegistrationByUser( req, res, next ) {

        logger('Registration by user controller called');
        const id = req.params.id;
        const { result, error } = await userDatamapper.findRegistrationByUser(id);

        controllerUtil.manageResponse(error, result, res, next);
    },

    async getNotificationByUser( req, res, next ) {

        logger('Notification by user controller called');
        const id = req.params.id;
        const { result, error } = await userDatamapper.findNotificationByUser(id);

        controllerUtil.manageResponse(error, result, res, next);
    },

    async getItemReservationByUser( req, res, next ) {

        logger('Item reservation by user controller called');
        const id = req.params.id;
        const { result, error } = await userDatamapper.findItemreservationByUser(id);

        controllerUtil.manageResponse(error, result, res, next);
    },

    async loginUser( req, res, next ) {
       
        logger('Login controller called');
        const mail = req.body.email
        const { result, error } = await userDatamapper.findUser(mail);
        
        if (result.length === 0 ) {
            return next(new APIerror('Invalid user or password', 401))
        }
        
        const isEqual = await bcrypt.compare(req.body.password, result[0].password);

        if(isEqual) {
            delete result.password;
            const token = jwt.sign(result[0], process.env.JWT_SECRET);
            controllerUtil.manageResponse(error, token, res, next);
        } else {
            next(new APIerror('Invalid user or password', 401))
        }
    },

    async createUser( req, res, next ) {

        logger('User create controller called');
        const newUser = req.body;
        const image = req.file ? req.file.path:null;
        const hash = await bcrypt.hash(newUser.password, parseInt(process.env.PASSWORD_SALT));
        newUser.password = hash;
        const { result, error } = await userDatamapper.insertUser(newUser, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateUser( req, res, next ) {

        logger('user update controller called');
        const id = req.params.id;
        const userModified = req.body;
        const { result, error } = await userDatamapper.modifyUser(id, userModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateUserPhoto( req, res, next ) {

        logger('User modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await userDatamapper.modifyUserPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async resetPassword( req, res, next ) {

        logger('User reset password controller called');
        const email = req.body.email;
        const token = resetToken(email);

        const { result: userResult , error: userError } = await userDatamapper.findUser(email);
        if (userError) {
            return next(new APIerror('Error executing SQL query', 500))
        };
        if (userResult.length === 0) {
            return next(new APIerror('Invalid user or password', 401));
        };

        let { result, error } = await userDatamapper.rebootPassword(email, token);
        const mailRequest = await sendMailReset(email, token);
        
        if(!mailRequest.result) { 
            error = mailRequest.error 
        };
        if(!mailRequest.error) { 
            result = mailRequest.result 
        };
        controllerUtil.manageResponse(error, result, res, next);
    },

    async changePassword( req, res, next ) {

        logger('Change password controller called');
        const { email, password } = req.body;
        const token = req.params.token;
        
        const { result: resetResult , error: resetError } = await userDatamapper.findResetPassword(email);
        
        if (resetError) {
            return next(new APIerror('Error executing SQL query', 500))
        };
        if (resetResult.length == 0) {
            return next(new APIerror('Invalid user or token'))
        };

        if (resetResult[0].token === token && resetResult[0].user_email === email) {
            const isvalid = jwt.verify(token, process.env.JWT_SECRET);
            if(!isvalid) {
                return new APIerror('Invalid Token', 498);
            } else {
                const hashed = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));
                const { result , error } = await userDatamapper.modifyPassword(email, hashed);
                await userDatamapper.deleteResetPassword(email);
                controllerUtil.manageResponse(error, result, res, next);
            };
            
        } else {
            return next(new APIerror('Expired token or invalid mail'))
        }
    },

    async removeUser( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await userDatamapper.deleteUser(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

logger('User controller initialized');
export default userController;