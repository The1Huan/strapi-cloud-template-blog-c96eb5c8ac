'use strict';

/**
 * breeding-dog router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::breeding-dog.breeding-dog');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/breeding-dogs/breeder/:breederId',
      handler: 'breeding-dog.findByBreeder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/breeding-dogs/available-for-stud',
      handler: 'breeding-dog.findAvailableForStud',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

module.exports = {
  routes: [
    ...defaultRouter.routes,
    ...customRoutes.routes,
  ],
};