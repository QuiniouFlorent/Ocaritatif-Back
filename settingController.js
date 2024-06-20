import debug from 'debug';
const logger = debug('app:controller');
import { settingDatamapper } from '../datamapper/index.js';
import controllerUtil from '../service/util/controller.js';

const settingController = {

    async getSetting( req, res, next ) {

        logger('Setting get controller called');
        const { result, error } = await settingDatamapper.findSetting();
        controllerUtil.manageResponse(error, result, res, next);
    },
    
    async createSetting( req, res, next ) {

        logger('Setting create controller called');
        const newSetting = req.body;
        const image = req.file ? req.file.path:null;
        const { result, error } = await settingDatamapper.insertSetting(newSetting, image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateSetting( req, res, next ) {

        logger('Setting modify controller called');
        const settingModified = req.body;
        const { result, error } = await settingDatamapper.modifySetting(settingModified);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async updateSettingLogo( req, res, next ) {

        logger('Setting modify Logo controller called');
        const image = req.file ? req.file.path:null;
        const { result, error } = await settingDatamapper.modifySettingLogo(image);
        controllerUtil.manageResponse(error, result, res, next);
    },

    async removeSetting( req, res, next ) {

        const id = req.params.id;
        const { result, error } = await settingDatamapper.deleteSetting(id);
        controllerUtil.manageResponse(error, result, res, next);
    }
}

export default settingController;