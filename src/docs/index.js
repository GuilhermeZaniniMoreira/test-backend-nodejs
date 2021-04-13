import productsSwagger from './products.swagger';
import categorySwagger from './category.swagger';
import authSwagger from './auth.swagger';

const routesSwagger = [productsSwagger, categorySwagger, authSwagger];

function routesObject(data) {
  const routesSwagger = data.map(route => {
     return route.paths;
  });
  const object = Object.assign({}, ...routesSwagger);
  return object;
}

export default {
  openapi: '3.0.1',
  info: {
     version: '1.0.0',
     title: 'API',
     description: 'Swagger to test endpoints',
  },
  servers: [
     {
        url: 'http://localhost:3333/',
        description: 'Local server',
     },
  ],
  paths: routesObject(routesSwagger),
  components: {
     securitySchemes: {
        bearerAuth: {
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'JWT',
        },
     },
  },
  security: [
     {
        bearerAuth: [],
     },
  ],
};
