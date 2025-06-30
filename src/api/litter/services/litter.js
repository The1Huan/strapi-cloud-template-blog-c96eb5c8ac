'use strict';

/**
 * litter service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::litter.litter');