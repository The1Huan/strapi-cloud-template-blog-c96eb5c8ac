'use strict';

/**
 * litter router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::litter.litter');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/litters/breeder/:breederId',
      handler: 'litter.findByBreeder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/litters/accepting-applications',
      handler: 'litter.findAcceptingApplications',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/litters/:id/status',
      handler: 'litter.updateStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/litters/:id/waiting-list',
      handler: 'litter.updateWaitingList',
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