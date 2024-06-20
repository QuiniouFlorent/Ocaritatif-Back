import debug from 'debug';
const logger = debug('app:controller');
import { homeDatamapper } from '../datamapper/index.js';

const homeController = {
    async getHomeInfos(req,res) {

        logger('Home controller called');
        const findNews = await homeDatamapper.findLastNews();
        const news = findNews.result; 

        const findEvents = await homeDatamapper.findNextEvent();
        const events = findEvents.result;
        
        res.json({ news, events });
    }
}

logger('Home controller initialized');
export default homeController;