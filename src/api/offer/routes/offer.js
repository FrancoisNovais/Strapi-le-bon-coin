"use strict";

/**
 * restaurant router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::offer.offer", {
  config: {
    // Nous ajoutons une configuration à une de nos routes
    delete: {
      // Nous ciblons la route delete
      policies: ["api::offer.is-authorized"], // Nous ajoutons la policy is-authorized à la route delete
    },
    update: {
      // Nous ciblons la route update
      policies: ["api::offer.is-authorized"], // Nous ajoutons la policy is-authorized à la route update
    },
  },
});
