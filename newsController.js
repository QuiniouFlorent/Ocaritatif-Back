import debug from 'debug';
const logger = debug('app:controller');
import { newsDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const newsController = {
    
    async getAllNews( req, res, next ) {
        logger('News getAll controller called');
        const { result, error } = await newsDatamapper.findAllNews();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getOneNews( req, res, next ) {
        logger('News getOne controller called');
        const id = req.params.id;
        const { result, error } = await newsDatamapper.findOneNews(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createNews( req, res, next ) {
        logger('News create controller called');
        const newNews = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await newsDatamapper.insertNews(newNews, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateNews( req, res, next ) {
        logger('News modify controller called');
        const id = req.params.id;
        const newsModified = req.body;
        const { result, error } = await newsDatamapper.modifyNews(id, newsModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateNewsPhoto( req, res, next ) {
        logger('News modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await newsDatamapper.modifyNewsPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeNews( req, res, next ) {
        const id = req.params.id;
        const { result, error } = await newsDatamapper.deleteNews(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default newsController;