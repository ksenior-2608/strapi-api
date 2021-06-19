'use strict';

const _ = require('lodash');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
function modifyEmail(email) {
    let parts = _.split(email, '@', 2);
    parts[0] = _.toLower(parts[0]);
    return parts[0] + '@' + parts[1];
}

module.exports = {
    /**
  * Retrieve records.
  *
  * @return {Array}
  */


    async find() {
        let entities;
        entities = await strapi.services.client.find();
        // console.log(entities);
        return entities.map(
            entity => {
                return {
                    email: entity.email,
                }
            }
        );
    },

    async create(ctx) {
        let newClientEmail = modifyEmail(ctx.request.body.email);
        // console.log(newClientEmail);
        let entity = await strapi.query("client").findOne({ email: newClientEmail });
        // console.log(entity);
        if (entity) {
            console.log("Email is already in use.");
        } else {
            entity = await strapi.services.client.create(ctx.request.body);
        }
        return entity;
    }
};
