const {Router} = require('express');
const {check} = require('express-validator');

const {
  categoriesGet,
  categoriesGetId,
  categoriesPost,
  categoriesPut,
  categoriesDelete
} = require("../controllers/categories");
const {validateJwt, validateAttributes, CategoryExists} = require("../middlewares");

const router = Router();

router.get('/', [validateJwt], categoriesGet);
router.get('/:id', [
  check('id', 'Id is Required').isMongoId(),
  CategoryExists,
  validateAttributes
], categoriesGetId);
router.post('/', [
  validateJwt,
  check('name', 'Name is Required').not().isEmpty(),
  validateAttributes
], categoriesPost);
router.put('/:id', [
  check('id', 'Id is Required').isMongoId(),
  CategoryExists,
  validateAttributes
], categoriesPut);
router.delete('/:id', [
  check('id', 'Id is Required').isMongoId(),
  CategoryExists,
  validateAttributes
], categoriesDelete);


module.exports = router;
