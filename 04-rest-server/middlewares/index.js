const {validateAttributes} = require("./validate-attributes");
const {isAdmin} = require("./is-admin");
const {validateJwt} = require("./validate-jwt");
const {CategoryExists} = require("./category-exists");

module.exports = {
  validateJwt,
  validateAttributes,
  isAdmin,
  CategoryExists
}
