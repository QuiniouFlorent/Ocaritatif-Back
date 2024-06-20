import debug from 'debug';
const logger = debug('app:server');

import 'dotenv/config';
import express, { urlencoded } from 'express';
const app = express();

import router from './app/router/index.js';
import cors from 'cors';

app.use(cors());

/*** AJOUT DE OPENAPI - Documentation de notre API */

// https://sebacode.medium.com/how-to-document-a-node-js-api-with-swagger-554101246a4d
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation for our API Ocaritatif',
      version: '1.0.0',
      description: 'This is a API application made with Express',
      contact: {
        name: 'O\'caritatif',
        url: 'https://o-caritatif-deploy.vercel.app/contact'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url : 'https://app-ocaritatif-e8cb111b5f68.herokuapp.com/',
        description: 'Production server'
      }
    ]
  },
  apis: ['./app/router/*/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification));

app.use(express.json());
app.use(urlencoded({extended: true}));

//app.use('/image', express.static('image'));
app.use(router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger(`Server started on http://localhost:${PORT}`);
});
