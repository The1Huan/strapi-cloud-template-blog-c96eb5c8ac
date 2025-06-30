'use strict';

/**
 * litter controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::litter.litter', ({ strapi }) => ({
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
        mediaGalleries: {
          populate: {
            images: true,
            videos: true
          }
        },
        puppies: {
          populate: {
            profileImage: true
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::litter.litter', populatedQuery);

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
        sire: {
          populate: {
            profileImage: true,
            healthDocuments: {
              populate: {
                document: true
              }
            },
            mediaGalleries: {
              populate: {
                images: true
              }
            }
          }
        },
        dam: {
          populate: {
            profileImage: true,
            healthDocuments: {
              populate: {
                document: true
              }
            },
            mediaGalleries: {
              populate: {
                images: true
              }
            }
          }
        },
        mediaGalleries: {
          populate: {
            images: true,
            videos: true
          }
        },
        puppies: {
          populate: {
            profileImage: true,
            mediaGalleries: {
              populate: {
                images: true
              }
            }
          }
        },
        applications: {
          populate: {
            buyer: {
              populate: {
                preferences: true
              }
            }
          }
        },
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::litter.litter', id, populatedQuery);

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
        mediaGalleries: {
          populate: {
            images: true
          }
        },
        puppies: {
          populate: {
            profileImage: true
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::litter.litter', populatedQuery);

    return { data, meta };
  },

  async findAcceptingApplications(ctx) {
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        waitingListOpen: true,
        status: ['planned', 'expecting', 'born'],
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
        mediaGalleries: {
          populate: {
            images: true
          }
        },
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::litter.litter', populatedQuery);

    return { data, meta };
  },

  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, actualPuppies, maleCount, femaleCount, birthDate } = ctx.request.body;
    
    const updateData = { status };
    
    if (status === 'born' && actualPuppies) {
      updateData.actualPuppies = actualPuppies;
      updateData.maleCount = maleCount;
      updateData.femaleCount = femaleCount;
      updateData.birthDate = birthDate || new Date();
    }
    
    const entity = await strapi.entityService.update('api::litter.litter', id, {
      data: updateData,
    });

    return { data: entity };
  },

  async updateWaitingList(ctx) {
    const { id } = ctx.params;
    const { waitingListOpen, waitingListCount } = ctx.request.body;
    
    const entity = await strapi.entityService.update('api::litter.litter', id, {
      data: {
        waitingListOpen,
        waitingListCount,
      },
    });

    return { data: entity };
  }
}));