'use strict';

/**
 * breeder router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::breeder.breeder');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/breeders/slug/:slug',
      handler: 'breeder.findBySlug',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/breeders/:id/last-active',
      handler: 'breeder.updateLastActive',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/breeders/:id/rating',
      handler: 'breeder.updateRating',
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