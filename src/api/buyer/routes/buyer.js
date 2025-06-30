'use strict';

/**
 * buyer router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::buyer.buyer');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/buyers/user/:userId',
      handler: 'buyer.findByUserId',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/buyers/:id/last-active',
      handler: 'buyer.updateLastActive',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/buyers/:id/preferences',
      handler: 'buyer.updatePreferences',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/buyers/:id/favorite-breeder',
      handler: 'buyer.addFavoriteBreeder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'DELETE',
      path: '/buyers/:id/favorite-breeder',
      handler: 'buyer.removeFavoriteBreeder',
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