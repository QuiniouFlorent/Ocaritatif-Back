import debug from 'debug';
const logger = debug('app:controller');
import { galeryDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const galeryController = {

    async getAllGalerie( req, res, next ) {
        logger('Galerie getAll controller called');
        const { result, error } = await galeryDatamapper.findAllGalery();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneGalerie( req, res, next ) {
        logger('Galerie getOne controller called');
        const id = req.params.id;
        const { result, error } = await galeryDatamapper.findOneGalery(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createGalerie( req, res, next ) {
        logger('Galerie create controller called');
        const newGalery = req.body;
        const { result, error } = await galeryDatamapper.insertGalery(newGalery)
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateGalerie( req, res, next ) {
        logger('Galerie modify controller called');
        const id = req.params.id;
        const galeryModified = req.body;
        const { result, error } = await galeryDatamapper.modifyGalery(id, galeryModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeGalerie( req, res, next ) {
        const id = req.params.id;
        const { result, error } = await galeryDatamapper.deleteGalery(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default galeryController;