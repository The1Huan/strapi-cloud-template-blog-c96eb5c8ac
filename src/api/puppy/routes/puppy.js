'use strict';

/**
 * puppy router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::puppy.puppy');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/puppies/available',
      handler: 'puppy.findAvailable',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/puppies/breeder/:breederId',
      handler: 'puppy.findByBreeder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/puppies/:id/availability',
      handler: 'puppy.updateAvailability',
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