'use strict';

/**
 * application controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::application.application', ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    
    const populatedQuery = {
      ...query,
      populate: {
        buyer: {
          populate: {
            profileImage: true,
            location: true,
            preferences: true
          }
        },
        breeder: {
          populate: {
            profileImage: true,
            location: true
          }
        },
        puppy: {
          populate: {
            profileImage: true,
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
        documents: true,
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::application.application', populatedQuery);

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      populate: {
        buyer: {
          populate: {
            profileImage: true,
            location: true,
            preferences: true
          }
        },
        breeder: {
          populate: {
            profileImage: true,
            location: true,
            contactInfo: true
          }
        },
        puppy: {
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
            }
          }
        },
        litter: {
          populate: {
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
            }
          }
        },
        documents: true,
        ...query.populate,
      },
    };

    const entity = await strapi.entityService.findOne('api::application.application', id, populatedQuery);

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
        buyer: {
          populate: {
            profileImage: true,
            location: true
          }
        },
        puppy: {
          populate: {
            profileImage: true
          }
        },
        litter: true,
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::application.application', populatedQuery);

    return { data, meta };
  },

  async findByBuyer(ctx) {
    const { buyerId } = ctx.params;
    const { query } = ctx;

    const populatedQuery = {
      ...query,
      filters: {
        buyer: buyerId,
        ...query.filters,
      },
      populate: {
        breeder: {
          populate: {
            profileImage: true,
            location: true
          }
        },
        puppy: {
          populate: {
            profileImage: true
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
        ...query.populate,
      },
    };

    const { data, meta } = await strapi.entityService.findMany('api::application.application', populatedQuery);

    return { data, meta };
  },

  async updateStatus(ctx) {
    const { id } = ctx.params;
    const { status, breederNotes, score, scoringBreakdown } = ctx.request.body;
    
    const updateData = { 
      status,
      lastUpdated: new Date()
    };
    
    if (breederNotes) updateData.breederNotes = breederNotes;
    if (score !== undefined) updateData.score = score;
    if (scoringBreakdown) updateData.scoringBreakdown = scoringBreakdown;
    
    if (status === 'under_review') {
      updateData.reviewedDate = new Date();
    } else if (status === 'approved') {
      updateData.reviewedDate = new Date();
    }
    
    const entity = await strapi.entityService.update('api::application.application', id, {
      data: updateData,
    });

    return { data: entity };
  },

  async scheduleInterview(ctx) {
    const { id } = ctx.params;
    const { interviewScheduled, notes } = ctx.request.body;
    
    const entity = await strapi.entityService.update('api::application.application', id, {
      data: {
        interviewScheduled: new Date(interviewScheduled),
        status: 'interview_scheduled',
        lastUpdated: new Date(),
        breederNotes: notes,
      },
    });

    return { data: entity };
  },

  async recordPayment(ctx) {
    const { id } = ctx.params;
    const { type, amount, date } = ctx.request.body;
    
    const updateData = {
      lastUpdated: new Date(),
    };
    
    if (type === 'deposit') {
      updateData.depositPaid = true;
      updateData.depositAmount = amount;
      updateData.depositDate = new Date(date);
    } else if (type === 'final') {
      updateData.finalPaymentDate = new Date(date);
    }
    
    const entity = await strapi.entityService.update('api::application.application', id, {
      data: updateData,
    });

    return { data: entity };
  },

  async addCommunication(ctx) {
    const { id } = ctx.params;
    const { message, type, author } = ctx.request.body;
    
    const application = await strapi.entityService.findOne('api::application.application', id);
    const currentHistory = application.communicationHistory || [];
    
    currentHistory.push({
      id: Date.now().toString(),
      message,
      type,
      author,
      timestamp: new Date(),
    });
    
    const entity = await strapi.entityService.update('api::application.application', id, {
      data: {
        communicationHistory: currentHistory,
        lastUpdated: new Date(),
      },
    });

    return { data: entity };
  }
}));