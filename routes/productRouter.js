const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const { validateAccessToken, validateAdmin } = require('../middlewares/auth.middlewares/authorization.middleware');
const { validateAddorUpdateProductRequest } = require('../middlewares/validation.middlewares/requestValidator');

router.post("/create", [validateAccessToken, validateAdmin, validateAddorUpdateProductRequest], productController.createProduct);
router.post("/createMultipleProducts", productController.createMultipleProducts);
router.get("/productsByName/:name", productController.fetchProductsByName);
router.get("/productById/:id", productController.fetchProductById);
router.get("/productsByCategoryId/:categoryId", productController.fetchProductsByCategoryId);
router.get("/searchByKeyword", productController.searchByKeyword);

module.exports = router;