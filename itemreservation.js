import debug from 'debug';
const logger = debug('app:controller');
import { itemreservationDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const itemreservationController = {

    async getAllItemreservation( req, res, next ) {

        logger('Itemreservation getAll Controller called');
        const { result, error } = await itemreservationDatamapper.findAllItemreservation();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneItemReservation( req, res, next ) {

        logger('Itemreservation get One Controller called');
        const id = req.params.id;
        const { result, error } = await itemreservationDatamapper.findOneItemreservation(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createItemreservation( req, res, next ) {

        logger('Itemreservation create controller called');
        const newItemreservation = req.body;
        const { result, error } = await itemreservationDatamapper.insertItemreservation(newItemreservation);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateItemreservation( req, res, next ) {

        logger('Itemreservation modify controller called');
        const id = req.params.id;
        const itemreservationModified = req.body;
        const { result, error } = await itemreservationDatamapper.modifyItemreservation(id, itemreservationModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeItemreservation( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await itemreservationDatamapper.deleteItemreservation(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default itemreservationController;