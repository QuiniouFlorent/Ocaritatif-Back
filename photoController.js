import debug from 'debug';
const logger = debug('app:controller');
import { photoDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const photoController = {

    async getAllPhoto( req, res, next ) {
        logger('Photo getAll controller called');
        const { result, error } = await photoDatamapper.findAllPhoto();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOnePhoto( req, res, next ) {
        logger('Photo getOne controller called');
        const id = req.params.id;
        const { result, error } = await photoDatamapper.findOnePhoto(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createPhoto( req, res, next ) {
        logger('Photo create controller called');
        const newPhoto = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await photoDatamapper.insertPhoto(newPhoto, image)
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhoto( req, res, next ) {
        logger('Photo modify controller called');
        const id = req.params.id;
        const photoModified = req.body;
        const { result, error } = await photoDatamapper.modifyPhoto(id, photoModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhotoPhoto( req, res, next ) {
        logger('Photo modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await photoDatamapper.modifyPhotoPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removePhoto( req, res, next ) {
        const id = req.params.id;
        const { result, error } = await photoDatamapper.deletePhoto(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default photoController;