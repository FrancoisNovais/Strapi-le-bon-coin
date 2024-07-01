"use strict";

const offer = require("../routes/offer");

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userId = ctx.state.user.id; // Nous récupérons l'id de la personne qui fait la requête
      console.log("Nous récupérons l'id de la personne qui fait la requête");
      console.log(userId);
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user", // Utiliser l'Entity Service API sur la collection User
        userId,
        {
          populate: ["offers"],
        }
      );
      console.log("Utiliser l'Entity Service API sur la collection User");
      console.log(user.offers);

      for (let i = 0; i < user.offers.length; i++) {
        console.log("On recupere chaque offre de l'user");
        console.log(user.offers[i]);
        const userOffers = user.offers[i];
        console.log("On recupere l'id de chaque offre");
        console.log(userOffers.id);
        console.log("-----------------------------");
        await strapi.entityService.delete("api::offer.offer", userOffers.id); // Suppression des offres
      }
      return { message: "All offers are deleted" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
  async create(ctx) {
    try {
      const userId = ctx.state.user.id; // Nous récupérons l'id de la personne qui fait la requête
      console.log(userId);
      const body = JSON.parse(ctx.request.body.data); // Nous récupérons l'id dans la clef owner
      console.log(body.owner);

      if (userId != body.owner) {
        // On compare l' id de la personne qui fait la requête avec l'id dans la clef owner
        ctx.response.status = 403; // Si il sont different on renvoie une erreur 403
        return { message: "You are not the offer owner." };
      } else {
        const { data, meta } = await super.create(ctx); //Sinon on appel le comportement par défaut de la route create
        return { data, meta }; // Réponse normale de la route
      }
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));
