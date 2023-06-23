const {Router} = require('express');
const {uploadFile} = require("../controllers/uploads");

const router = Router();

router.post('/', uploadFile);

module.exports = router;
