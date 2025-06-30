'use strict';

/**
 * application router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::application.application');

const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/applications/breeder/:breederId',
      handler: 'application.findByBreeder',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/applications/buyer/:buyerId',
      handler: 'application.findByBuyer',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/applications/:id/status',
      handler: 'application.updateStatus',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/applications/:id/interview',
      handler: 'application.scheduleInterview',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/applications/:id/payment',
      handler: 'application.recordPayment',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/applications/:id/communication',
      handler: 'application.addCommunication',
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