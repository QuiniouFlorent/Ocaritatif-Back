import debug from 'debug';
const logger = debug('app:controller');
import { aboutdataDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const aboutdataController = {

    async getAllAboutdata( req, res, next ) {

        logger('Aboutdata getAll controller called');
        const { result, error } = await aboutdataDatamapper.findAllAboutdata();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneAboutdata( req, res, next ) {

        logger('Aboutdata getAll controller called');
        const id = req.params.id;
        const { result, error } = await aboutdataDatamapper.findOneAboutdata(id);
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createAboutdata( req, res, next ) {

        logger('Aboutdata create controller called');
        const image = req.file ? req.file.path:null;
        const newAboutdata = req.body;
        const { result, error } = await aboutdataDatamapper.insertAboutdata(newAboutdata, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateAboutdata( req, res, next ) {

        logger('Aboutdata modify controller called');
        const id = req.params.id;
        const aboutdataModified = req.body;
        const { result, error } = await aboutdataDatamapper.modifyAboutdata(id, aboutdataModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateAboutdataPosition( req, res, next ) {

        logger('Aboutdata modify Position controller called');
        const aboutdataPositionModified = req.body;
        const { result, error } = await aboutdataDatamapper.modifyAboutdataPosition(aboutdataPositionModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateAboutdataPhoto( req, res, next ) {

        logger('Aboutdata modify controller called');
        const id = req.params.id;
        const image = req.file ? req.file.path:null;
        const { result, error } = await aboutdataDatamapper.modifyAboutdataPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeAboutdata( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await aboutdataDatamapper.deleteAboutdata(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default aboutdataController;