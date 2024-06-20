import debug from 'debug';
const logger = debug('app:controller');

import aboutdataController from './aboutdataController.js';
import commentController from './commentController.js';
import contactusController from './contactusController.js'
import eventController from './eventController.js';
import boardmemberController from './boardmemberController.js';
import galerieController from './galerieController.js';
import homeController from './homeController.js';
import homedataController from './homedataController.js';
import itemController from './itemController.js';
import itemreservationController from './itemreservation.js';
import newsController from './newsController.js';
import notificationController from './notificationController.js';
import opinionController from './opinionController.js';
import photoController from './photoController.js';
import photoaboutController from './photoaboutController.js';
import photohomeController from './photohomeController.js';
import registrationController from './registrationController.js';
import settingController from './settingController.js';
import sponsorController from './sponsorController.js';
import userController from './userController.js';

logger('Main controller initialized');

export {aboutdataController,
        commentController,
        contactusController,
        eventController, 
        boardmemberController,
        galerieController, 
        homeController,
        homedataController,
        itemController,
        itemreservationController,
        newsController,
        notificationController,
        opinionController,
        photoController, 
        photoaboutController,
        photohomeController,
        registrationController,
        settingController,
        sponsorController, 
        userController 
};