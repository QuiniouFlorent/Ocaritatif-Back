import debug from 'debug';
const logger = debug('app:controller');
import { itemDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const itemController = {

    async getAllItem( req, res, next ) {

        logger('Item getAll controller called');
        const { result, error } = await itemDatamapper.findAllItem();
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async getOneItem( req, res, next ) {

        logger('Item getOne controller called');
        const id = req.params.id;
        const { result, error } = await itemDatamapper.findOneItem(id);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async createItem( req, res, next ) {

        logger('Item create controller called');
        const newItem = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await itemDatamapper.insertItem(newItem, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateItem( req, res, next ) {

        logger('Item modify controller called');
        const id = req.params.id;
        const itemModified = req.body;
        const { result, error } = await itemDatamapper.modifyItem(id, itemModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateItemPhoto( req, res, next ) {

        logger('Item modify Photo controller called');
        const id = req.params.id;
        const image =  req.file ? req.file.path:null;
        const { result, error } = await itemDatamapper.modifyItemPhoto(id, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeItem( req, res, next ) {
        
        const id = req.params.id;
        const { result, error } = await itemDatamapper.deleteItem(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default itemController;