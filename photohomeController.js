import debug from 'debug';
const logger = debug('app:controller');
import { photohomeDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const photohomeController = {

    async getAllPhotohome( req, res, next ) {

        logger('Photohome getAll controller called');
        const { result, error } = await photohomeDatamapper.findAllPhotohome();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOnePhotohome( req, res, next ) {

        logger('Photohome getOne controller called');
        const id = req.params.id;
        const { result, error } = await photohomeDatamapper.findOnePhotohome(id);
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createPhotohome( req, res, next ) {

        logger('Photohome create controller called');
        const newPhotohome = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await photohomeDatamapper.insertPhotohome(newPhotohome, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhotohome( req, res, next ) {

        logger('Photohome modify controller called');
        const id = req.params.id;
        const photohomeModified = req.body;
        const { result, error } = await photohomeDatamapper.modifyPhotohome(id, photohomeModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updatePhotohomePhoto( req, res, next) {

        logger('Photohome modify photo controller called');
        const id = req.params.id;
        const image = req.file ? req.file.path:null;
        const { result, error } = await photohomeDatamapper.modifyPhotohomePhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removePhotohome( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await photohomeDatamapper.deletePhotohome(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default photohomeController;