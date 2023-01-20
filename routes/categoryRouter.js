const express = require('express');
const router = express.Router();

const categoryController = require('../controller/categoryController');
const { validateAccessToken, validateAdmin } = require('../middlewares/auth.middlewares/authorization.middleware');
const { validateAddorUpdateCategoryRequest } = require('../middlewares/validation.middlewares/requestValidator');

router.post("/create", [validateAccessToken, validateAdmin], validateAddorUpdateCategoryRequest,categoryController.create);
router.get("/categories", categoryController.fetchAllCategories);
router.get("/:categoryId", categoryController.fetchCategoryByID);
router.get("/categoryByName/:name", categoryController.fetchCategoryByName);

module.exports = router;