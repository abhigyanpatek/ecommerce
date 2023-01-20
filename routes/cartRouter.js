const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const {validateAccessToken} = require('../middlewares/auth.middlewares/authorization.middleware');

router.post("/create", [validateAccessToken], cartController.createCart);
router.put("/update/:id", [validateAccessToken], cartController.updateCart);
router.delete("/delete/:id", [validateAccessToken], cartController.removeProductInCart);
router.get("/:id", [validateAccessToken], cartController.getCart);

module.exports = router;