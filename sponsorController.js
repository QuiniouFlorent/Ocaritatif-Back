import debug from 'debug';
const logger = debug('app:controller');
import { sponsorDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const sponsorController = {

    async getAllSponsor( req, res, next ) {

        logger('Sponsor getAll controller called');
        const { result, error } = await sponsorDatamapper.findAllSponsor();
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async getOneSponsor( req, res, next ) {

        logger('Sponsor getOne controller called');
        const id = req.params.id;
        const { result, error } = await sponsorDatamapper.findOneSponsor(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createSponsor( req, res, next ) {

        logger('Sponsor create controller called');
        const newSponsor = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await sponsorDatamapper.insertSponsor(newSponsor, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateSponsor( req, res, next ) {

        logger('Sponsor modify controller called');
        const id = req.params.id;
        const sponsorModified = req.body;
        const { result, error } = await sponsorDatamapper.modifySponsor(id, sponsorModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateSponsorPhoto( req, res, next ) {

        logger('Sponsor modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await sponsorDatamapper.modifySponsorPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeSponsor( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await sponsorDatamapper.deleteSponsor(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default sponsorController;