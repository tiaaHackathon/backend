const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routers/index.js'];

const doc = {
    info: {
        title: 'Express API with Swagger',
        description: 'API documentation for the Express API',
        version: '1.0.0',
    },
    host: 'mrs-app-server.onrender.com', // replace with your API's host
    basePath: '/',
    schemes: ['http', 'https'],
};


swaggerAutogen(outputFile, endpointsFiles, doc);