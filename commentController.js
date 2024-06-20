import debug from 'debug';
const logger = debug('app:controller');
import { commentDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const commentController = {

    async getAllComment( req, res, next ) {

        logger('Comment getAll Controller called');
        const { result, error } = await commentDatamapper.findAllComment();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createComment( req, res, next ) {

        logger('Comment create controller called');
        const newComment = req.body;
        const { result, error } = await commentDatamapper.insertComment(newComment);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateComment( req, res, next ) {

        logger('Comment modify controller called');
        const id = req.params.id;
        const commentModified = req.body;
        const { result, error } = await commentDatamapper.modifyComment(id, commentModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeComment( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await commentDatamapper.deleteComment(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default commentController;