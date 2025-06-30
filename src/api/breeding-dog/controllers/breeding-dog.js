'use strict';

/**
 * breeding-dog controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::breeding-dog.breeding-dog', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const populatedQuery = {
      ...query,
      populate: {
        breeder: {
          populate: {
            profileImage: true,
            location: true
          }
        },
        healthDocuments: {
          populate: {
            document: true
          }
        },
        mediaGalleries: {
          populate: {
            images: true,
            videos: true
          }
        },
        profileImage: true,
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::breeding-dog.breeding-dog', populatedQuery);

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      populate: {
        breeder: {
          populate: {
            profileImage: true,
            location: true,
            contactInfo: true
          }
        },
        healthDocuments: {
          populate: {
            document: true
          }
        },
        mediaGalleries: {
          populate: {
            images: true,
            videos: true
          }
        },
        profileImage: true,
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::breeding-dog.breeding-dog', id, populatedQuery);

    return { data: entity };
  },

  async findByBreeder(ctx) {
    const { breederId } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        breeder: breederId,
        ...query.filters,
      },
      populate: {
        healthDocuments: true,
        mediaGalleries: {
          populate: {
            images: true
          }
        },
        profileImage: true,
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::breeding-dog.breeding-dog', populatedQuery);

    return { data, meta };
  },

  async findAvailableForStud(ctx) {
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        isAvailableForStud: true,
        gender: 'male',
        isRetired: false,
        publishedAt: { $ne: null },
        ...query.filters,
      },
      populate: {
        breeder: {
          populate: {
            profileImage: true,
            location: true,
            contactInfo: true
          }
        },
        profileImage: true,
        healthDocuments: true,
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::breeding-dog.breeding-dog', populatedQuery);

    return { data, meta };
  }
}));