import debug from 'debug';
const logger = debug('app:controller');
import { homedataDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const homedataController = {

    async getHomedata( req, res, next ) {

        logger('Homedata get controller called');
        const { result, error } = await homedataDatamapper.findHomedata();
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createHomedata( req, res, next ) {

        logger('Homedata create controller called');
        const newHomedata = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await homedataDatamapper.insertHomedata(newHomedata, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateHomedata( req, res, next ) {

        logger('Homedata modify controller called');
        const homedataModified = req.body;
        const { result, error } = await homedataDatamapper.modifyHomedata(homedataModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeHomedata( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await homedataDatamapper.deleteHomedata(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default homedataController;