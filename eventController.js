import debug from 'debug';
const logger = debug('app:controller');
import { eventDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const eventController = {
    async getAllEvent( req, res, next ) {
        logger('Event getAll controller called');
        const { result , error } = await eventDatamapper.findAllEvent();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneEvent( req, res, next ) {
        logger('Event getOne controller called');
        const id = req.params.id;
        const { result , error } = await eventDatamapper.findOneEvent(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createEvent( req, res, next ) {
        logger('Event create controller called');
        const newEvent = req.body;
        const image = req.file ? req.file.path:null;
        const { result , error } = await eventDatamapper.insertEvent(newEvent, image)
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateEvent( req, res, next ) {
        logger('Event modify controller called');
        const id = req.params.id;
        const eventModified = req.body;
        const { result , error } = await eventDatamapper.modifyEvent(id, eventModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateEventPhoto( req, res, next ) {
        logger('Event modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await eventDatamapper.modifyEventPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeEvent( req, res,next ) {
        const id = req.params.id;
        const { result , error } = await eventDatamapper.deleteEvent(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default eventController;