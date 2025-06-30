'use strict';

/**
 * breeder service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::breeder.breeder', ({ strapi }) => ({
  async findByUserId(userId) {
    const entities = await strapi.entityService.findMany('api::breeder.breeder', {
      filters: { userId },
      populate: {
        contactInfo: true,
        location: true,
        miniWebsite: true,
        profileImage: true,
        mediaGalleries: {
          populate: {
            images: true,
            videos: true
          }
        },
      },
    });

    return entities.length > 0 ? entities[0] : null;
  },

  async findNearby(latitude, longitude, radius = 50) {
    // This would need a custom SQL query or plugin for geographic search
    // For now, we'll return a basic implementation
    const entities = await strapi.entityService.findMany('api::breeder.breeder', {
      filters: {
        isActive: true,
        publishedAt: { $ne: null }
      },
      populate: {
        location: true,
        profileImage: true,
      },
    });

    // In production, you'd want to use PostGIS or similar for proper geo queries
    return entities;
  },

  async searchByBreeds(breeds) {
    const entities = await strapi.entityService.findMany('api::breeder.breeder', {
      filters: {
        specializations: { $contains: breeds },
        isActive: true,
        publishedAt: { $ne: null }
      },
      populate: {
        contactInfo: true,
        location: true,
        profileImage: true,
      },
    });

    return entities;
  },

  async updateStats(breederId, stats) {
    return await strapi.entityService.update('api::breeder.breeder', breederId, {
      data: stats,
    });
  },

  async getTopRated(limit = 10) {
    const entities = await strapi.entityService.findMany('api::breeder.breeder', {
      filters: {
        isActive: true,
        publishedAt: { $ne: null },
        rating: { $gt: 4.0 }
      },
      sort: [{ rating: 'desc' }, { totalReviews: 'desc' }],
      limit,
      populate: {
        profileImage: true,
        location: true,
      },
    });

    return entities;
  }
}));