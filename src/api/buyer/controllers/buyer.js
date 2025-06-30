'use strict';

/**
 * buyer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::buyer.buyer', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const populatedQuery = {
      ...query,
      populate: {
        preferences: true,
        location: true,
        profileImage: true,
        applications: {
          populate: {
            puppy: {
              populate: {
                profileImage: true,
                breeder: {
                  populate: {
                    profileImage: true
                  }
                }
              }
            },
            litter: {
              populate: {
                breeder: {
                  populate: {
                    profileImage: true
                  }
                }
              }
            }
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::buyer.buyer', populatedQuery);

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      populate: {
        preferences: true,
        location: true,
        profileImage: true,
        applications: {
          populate: {
            puppy: {
              populate: {
                profileImage: true,
                breeder: {
                  populate: {
                    profileImage: true,
                    location: true
                  }
                }
              }
            },
            litter: {
              populate: {
                breeder: {
                  populate: {
                    profileImage: true,
                    location: true
                  }
                }
              }
            }
          }
        },
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::buyer.buyer', id, populatedQuery);

    return { data: entity };
  },

  async findByUserId(ctx) {
    const { userId } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        userId: userId,
        ...query.filters,
      },
      populate: {
        preferences: true,
        location: true,
        profileImage: true,
        applications: {
          populate: {
            puppy: {
              populate: {
                profileImage: true,
                breeder: true
              }
            },
            litter: {
              populate: {
                breeder: true
              }
            }
          }
        },
        ...query.populate,
      },
    };

    const entities = await strapi.entityService.findMany('api::buyer.buyer', populatedQuery);
    
    if (!entities.length) {
      return ctx.notFound('Buyer not found');
    }

    return { data: entities[0] };
  },

  async updateLastActive(ctx) {
    const { id } = ctx.params;
    
    const entity = await strapi.entityService.update('api::buyer.buyer', id, {
      data: {
        lastActive: new Date(),
      },
    });

    return { data: entity };
  },

  async updatePreferences(ctx) {
    const { id } = ctx.params;
    const { preferences } = ctx.request.body;
    
    const entity = await strapi.entityService.update('api::buyer.buyer', id, {
      data: {
        preferences,
      },
    });

    return { data: entity };
  },

  async addFavoriteBreeder(ctx) {
    const { id } = ctx.params;
    const { breederId } = ctx.request.body;
    
    const buyer = await strapi.entityService.findOne('api::buyer.buyer', id);
    const currentFavorites = buyer.favoriteBreeders || [];
    
    if (!currentFavorites.includes(breederId)) {
      currentFavorites.push(breederId);
    }
    
    const entity = await strapi.entityService.update('api::buyer.buyer', id, {
      data: {
        favoriteBreeders: currentFavorites,
      },
    });

    return { data: entity };
  },

  async removeFavoriteBreeder(ctx) {
    const { id } = ctx.params;
    const { breederId } = ctx.request.body;
    
    const buyer = await strapi.entityService.findOne('api::buyer.buyer', id);
    const currentFavorites = buyer.favoriteBreeders || [];
    
    const updatedFavorites = currentFavorites.filter(fav => fav !== breederId);
    
    const entity = await strapi.entityService.update('api::buyer.buyer', id, {
      data: {
        favoriteBreeders: updatedFavorites,
      },
    });

    return { data: entity };
  }
}));