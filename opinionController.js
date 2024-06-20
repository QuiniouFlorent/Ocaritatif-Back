import debug from 'debug';
const logger = debug('app:controller');
import { opinionDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const opinionController = {
    async getAllOpinion( req, res, next ) {
        logger('Opinion getAll controller called');
        const { result, error } = await opinionDatamapper.findAllOpinion();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneOpinion( req, res, next ) {
        logger('Opinion getOne controller called');
        const id = req.params.id;
        const { result, error } = await opinionDatamapper.findOneOpinion(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createOpinion( req, res, next ) {
        logger('Opinion create controller called');
        const newOpinion = req.body;
        const { result, error } = await opinionDatamapper.insertOpinion(newOpinion)
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateOpinion( req, res, next ) {
        logger('Opinion modify controller called');
        const id = req.params.id;
        const opinionModified = req.body;
        const { result, error } = await opinionDatamapper.modifyOpinion(id, opinionModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateOpinionPosition( req, res, next ) {
        logger('Opinion modify Position controller called');
        const opinionPositionModified = req.body;
        const { result , error } = await opinionDatamapper.modifyOpinionPosition(opinionPositionModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeOpinion( req, res, next ) {
        const id = req.params.id;
        const { result, error } = await opinionDatamapper.deleteOpinion(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default opinionController;