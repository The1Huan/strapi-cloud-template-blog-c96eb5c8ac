'use strict';

/**
 * application service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::application.application');