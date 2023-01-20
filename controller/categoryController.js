const categoryRepository = require('../dao/repository/category.repository');
const errorConstants = require('../constants/errorConstants');

const createCategory = (req, res) => {
    const body = req.body;

    categoryRepository.createCategory({
        name: body.name, 
        description: body.description
    }).then(result => {
        console.log(`category name: ${body.name} was created successfully!`);
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR){
            console.log(error.errors[0]);
            res.status(400).send({
                message: `${body.name} already exists!`
            });
            return;
        }
        throw error;
    }).catch(error => {
        console.log(`Error in creating category: ${body.name}. Error message: ${error.message}`);
        res.status(500).send({
            message: "Error in creating category. Please try again after sometime!"
        });
    })
}

const fetchAllCategories = (req, res) => {
    categoryRepository.fetchAllCategories()
    .then(categories => {
        res.status(200).send(categories);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error in loading all categories, Please try again after sometime!"
        });
    })
}

const fetchCategoryByID = (req, res) => {
    const categoryId = req.params.categoryId;
    categoryRepository.fetchCategoryById(categoryId)
    .then(result => {
        if(!result){
            throw Error(errorConstants.MISSING_CATEGORY);
        }
        res.status(200).send(result);
    }).catch(error => {
        if(error.message === errorConstants.MISSING_CATEGORY){
            res.status(404).send({
                message: "The requested category Id doesn't exit in the system!"
            });
        }
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error in loading category from database, Please try again after sometime!"
        });
    })
}

const fetchCategoryByName = (req, res) => {
    categoryRepository.fetchCategoriesByCriteria({
        where: {
            name: req.params.name
        }
    }).then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured ing processing the request, Please try again after sometime!"
        });
    })
}

module.exports = {
    create: createCategory,
    fetchAllCategories: fetchAllCategories,
    fetchCategoryByID: fetchCategoryByID,
    fetchCategoryByName: fetchCategoryByName,
}