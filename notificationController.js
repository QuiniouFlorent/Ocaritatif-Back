import debug from 'debug';
const logger = debug('app:controller');
import { notificationDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const notificationController = {

    async getAllNotification( req, res, next ) {

        logger('Notification getAll controller called');
        const { result, error } = await notificationDatamapper.findAllNotification();
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async getOneNotification( req, res, next ) {

        logger('Notification getOne controller called');
        const id = req.params.id;
        const { result, error } = await notificationDatamapper.findOneNotification(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createNotification( req, res, next ) {

        logger('Notification create controller called');
        const newNotification = req.body;
        const { result, error } = await notificationDatamapper.insertNotification(newNotification);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateNotification( req, res, next ) {

        logger('Notification modify controller called');
        const id = req.params.id;
        const notificationModified = req.body;
        const { result, error } = await notificationDatamapper.modifyNotification(id, notificationModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeNotification( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await notificationDatamapper.deleteNotification(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default notificationController;