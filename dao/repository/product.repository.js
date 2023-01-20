const dbConnection = require('./dbConnection');
const defineProduct = require('../models/product.model');
const defineCategory = require('../models/category.model');

const Product = defineProduct(dbConnection.connection, dbConnection.DataTypes);

const createProductTable = async (forceCreation) => {
    const Category = defineCategory(dbConnection.connection, dbConnection.DataTypes);
    Product.belongsTo(Category, {
        foreignKey: 'categoryId',
        targetKey: 'id'
    });
    await Product.sync({force: forceCreation});
}

const createProduct = async (product) => {
    return await Product.create(product);
}

// add multiple products at one time
const createMultipleProducts = async (products) => { 
    return await Product.bulkCreate(products);
}

const fetchProductById = async (id) => {
    return await Product.findByPk(id);
}

const fetchAllProducts = async () => {
    return await Product.findAll();
}

const fetchProductsByCriteria = async (criteria) => {
    return await Product.findAll(criteria);
} 

module.exports = {
    createProductTable: createProductTable,
    createProduct: createProduct,
    createMultipleProducts: createMultipleProducts,
    fetchProductById: fetchProductById,
    fetchAllProducts: fetchAllProducts,
    fetchProductsByCriteria: fetchProductsByCriteria,
    Product
}