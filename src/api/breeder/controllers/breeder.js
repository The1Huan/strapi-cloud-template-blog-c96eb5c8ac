'use strict';

/**
 * breeder controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::breeder.breeder', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    // Add default population for related components
    const populatedQuery = {
      ...query,
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
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::breeder.breeder', populatedQuery);

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
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
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::breeder.breeder', id, populatedQuery);

    return { data: entity };
  },

  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        slug: slug,
        ...query.filters,
      },
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
        ...query.populate,
      },
    };

    const entities = await strapi.entityService.findMany('api::breeder.breeder', populatedQuery);
    
    if (!entities.length) {
      return ctx.notFound('Breeder not found');
    }

    return { data: entities[0] };
  },

  async updateLastActive(ctx) {
    const { id } = ctx.params;
    
    const entity = await strapi.entityService.update('api::breeder.breeder', id, {
      data: {
        lastActive: new Date(),
      },
    });

    return { data: entity };
  },

  async updateRating(ctx) {
    const { id } = ctx.params;
    const { rating, totalReviews } = ctx.request.body;
    
    const entity = await strapi.entityService.update('api::breeder.breeder', id, {
      data: {
        rating,
        totalReviews,
      },
    });

    return { data: entity };
  }
}));