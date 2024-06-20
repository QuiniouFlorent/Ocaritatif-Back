import debug from 'debug';
const logger = debug('app:controller');
import { boardmemberDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const boardmemberController = {

    async getAllBoardmember( req, res, next ) {

        logger('Boardmember getAll controller called');
        const { result, error } = await boardmemberDatamapper.findAllBoardmember();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneBoardmember( req, res, next ) {

        logger('Boardmember getOne controller called');
        const id = req.params.id;
        const { result, error } = await boardmemberDatamapper.findOneBoardmember(id);
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createBoardmember( req, res, next ) {

        logger('Boardmember create controller called');
        const newBoardmember = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await boardmemberDatamapper.insertBoardmember(newBoardmember, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateBoardmember( req, res, next ) {

        logger('Boardmember modify controller called');
        const id = req.params.id;
        const boardmemberModified = req.body;
        const { result, error } = await boardmemberDatamapper.modifyBoardmember(boardmemberModified, id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateBoardmemberPosition( req, res, next ) {
        
        logger('Boardmember modify Position called');
        const boardmemberPositionModified = req.body;
        const { result , error } = await boardmemberDatamapper.modifyBoardmemberPosition(boardmemberPositionModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateBoardmemberPhoto( req, res, next ) {

        logger('Boardmember modify Photo controller called');
        const id = req.params.id;
        const image = req.file ? req.file.path:null;
        const { result, error } = await boardmemberDatamapper.modifyBoardmemberPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeBoardmember( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await boardmemberDatamapper.deleteBoardmember(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default boardmemberController;