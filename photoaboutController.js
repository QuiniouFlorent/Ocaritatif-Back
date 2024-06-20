import debug from 'debug';
const logger = debug('app:controller');
import { photoaboutDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const photoaboutController = {

    async getAllPhotoabout( req, res, next ) {

        logger('Photoabout getAll controller called');
        const { result, error } = await photoaboutDatamapper.findAllPhotoabout();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOnePhotoabout( req, res, next ) {

        logger('Photoabout getOne controller called');
        const id = req.params.id;
        const { result, error } = await photoaboutDatamapper.findOnePhotoabout(id);
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createPhotoabout( req, res, next ) {

        logger('Photoabout create controller called');
        const image = req.file ? req.file.path:null;
        const newPhotoabout = req.body;
        const { result, error } = await photoaboutDatamapper.insertPhotoabout(image, newPhotoabout);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhotoabout( req, res, next ) {

        logger('Photoabout modify controller called');
        const id = req.params.id;
        const image = req.file ? req.file.path:null;
        const { result, error } = await photoaboutDatamapper.modifyPhotoabout(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhotoaboutPosition( req, res, next ) {

        logger('Photoabout modify position controller called');
        const photoaboutPositionModified = req.body;
        const { result, error } = await photoaboutDatamapper.modifyPhotoaboutPosition(photoaboutPositionModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removePhotoabout( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await photoaboutDatamapper.deletePhotoabout(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default photoaboutController;