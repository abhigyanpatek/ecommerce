const dbConnection = require('./dbConnection');
const defineCategory = require('../models/Category.model');

const Category = defineCategory(dbConnection.connection, dbConnection.DataTypes);

const createCategoryTable = async (forceCreation) =>{
    await Category.sync({force : forceCreation});
}

//function to create a new row in the Category table
const save = async (category) => {
    return await Category.create({
        name: category.name,
        description: category.description
    });
}

//function to select a row from the Category table
const fetchCategoryById = async (id) => {
    return await Category.findByPk(id);
}

//function to show all categories
const fetchAllCategories = async () => {
    return await Category.findAll();
}

//function to update a row in the Cateogry table
//delete a row from the Category table

module.exports = {
    createCategoryTable: createCategoryTable,
    createCategory: save,
    fetchCategoryById: fetchCategoryById,
    fetchAllCategories: fetchAllCategories
}