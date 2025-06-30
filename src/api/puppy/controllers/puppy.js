'use strict';

/**
 * puppy controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::puppy.puppy', ({ strapi }) => ({
  async find(ctx) {
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
        litter: {
          populate: {
            sire: {
              populate: {
                profileImage: true
              }
            },
            dam: {
              populate: {
                profileImage: true
              }
            }
          }
        },
        sire: {
          populate: {
            profileImage: true
          }
        },
        dam: {
          populate: {
            profileImage: true
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

    const { data, meta } = await strapi.entityService.findMany('api::puppy.puppy', populatedQuery);

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
        litter: {
          populate: {
            sire: {
              populate: {
                profileImage: true,
                healthDocuments: true
              }
            },
            dam: {
              populate: {
                profileImage: true,
                healthDocuments: true
              }
            }
          }
        },
        sire: {
          populate: {
            profileImage: true,
            healthDocuments: true
          }
        },
        dam: {
          populate: {
            profileImage: true,
            healthDocuments: true
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
        applications: {
          populate: {
            buyer: true
          }
        },
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::puppy.puppy', id, populatedQuery);

    // Increment view count
    if (entity) {
      await strapi.entityService.update('api::puppy.puppy', id, {
        data: {
          viewCount: (entity.viewCount || 0) + 1,
        },
      });
    }

    return { data: entity };
  },

  async findAvailable(ctx) {
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        isAvailable: true,
        availabilityStatus: 'available',
        publishedAt: { $ne: null },
        ...query.filters,
      },
      populate: {
        breeder: {
          populate: {
            profileImage: true,
            location: true
          }
        },
        profileImage: true,
        mediaGalleries: {
          populate: {
            images: true
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::puppy.puppy', populatedQuery);

    return { data, meta };
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
        profileImage: true,
        mediaGalleries: {
          populate: {
            images: true
          }
        },
        sire: {
          populate: {
            profileImage: true
          }
        },
        dam: {
          populate: {
            profileImage: true
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::puppy.puppy', populatedQuery);

    return { data, meta };
  },

  async updateAvailability(ctx) {
    const { id } = ctx.params;
    const { availabilityStatus, reservedDate, saleDate } = ctx.request.body;
    
    const updateData = { availabilityStatus };
    
    if (availabilityStatus === 'reserved') {
      updateData.reservedDate = reservedDate || new Date();
      updateData.isAvailable = false;
    } else if (availabilityStatus === 'sold') {
      updateData.saleDate = saleDate || new Date();
      updateData.isAvailable = false;
    } else if (availabilityStatus === 'available') {
      updateData.isAvailable = true;
      updateData.reservedDate = null;
      updateData.saleDate = null;
    }
    
    const entity = await strapi.entityService.update('api::puppy.puppy', id, {
      data: updateData,
    });

    return { data: entity };
  }
}));