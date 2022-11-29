const productRepository = require('../dao/repository/product.repository');
const errorConstants = require('../constants/errorConstants');
const { Op } = require('sequelize');

const createProduct = (req, res) => {
    const body = req.body;

    productRepository.createProduct({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
        categoryId: body.categoryId
    }).then(result => {
        console.log(`Product: ${body.name} has been created successfully!`);
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === errorConstants.UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR){
            console.log(error.message);
            res.status(400).send({
                message: `Product name: ${body.name} already exists!`
            });
            return;
        }
        throw error;
    }).catch(error => {
        if(error.name === errorConstants.FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR){
            console.log(`Invalid categoryId ${body.categoryId}`);
            res.status(400).send({
                message: "Category Id doesn't exist in the system!"
            });
            return;
        }
        throw error;
    }).catch(error => {
        console.log(`Saving ${body.name} to database failed with error ${error.message}`);
        res.status(500).send({
            message: "Unable to save product. Please try again after sometime!"
        });
    })
}

const createMultipleProducts = (req, res) => {
    const products = req.body.products;
    const validProducts = new Array();
    for(const product of products){
        if(!product.name || !product.categoryId){
            res.status(400).send({
                message: "Name or CategoryId cannot be empty!"
            })
            return;
        }
        validProducts.push({
            name: product.name, 
            description: product.description,
            imageUrl: product.imageUrl,
            price: product.price,
            categoryId: product.categoryId
        });
    }
    productRepository.createMultipleProducts(validProducts)
    .then(result => {
        console.log("Multiple products have been created successfully!");
        res.status(201).send(result);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error in creating multiple products, Please try again after sometime!"
        });
    })
}

const fetchProductsByName = (req, res) => {
    productRepository.fetchProductsByCriteria({
        where: {
            name: req.params.name
        }
    })
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in processing the request, Please try again after sometime!"
        });
    })
}

const fetchProductById = (req, res) => {
    const id = parseInt(req.params.id);
    productRepository.fetchProductById(id)
    .then(result => {
        if(!result){
            res.status(404).send({
                message: `productId: ${id} doesn't exists!`
            });
            return;
        }
        res.status(200).send(result);
    })
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in processing the request. Please try again after sometime!"
        })
    })
}

const fetchProductsByCategoryId = (req, res) => {
    let criteria;
    const maxPrice = req.query.maxPrice;
    const minPrice = req.query.minPrice;

    if(maxPrice && minPrice){
        criteria = {
            where: {
                [Op.and]: [
                    { categoryId: req.params.categoryId },
                    {price: {
                        [Op.between]: [minPrice, maxPrice]
                    }}
                ]
            },
            order: [
                ['price', 'ASC']
            ]
        }
    }else{
        criteria = {
            where: {
                categoryId: req.params.categoryId
            }
        }
    }

    productRepository.fetchProductsByCriteria(criteria)
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in processing the request, Please try again after sometime!"
        });
    })
}

const searchByKeyword = (req, res) => {
    const keyword = req.query.search;
    const keywords = keyword.split(' ');
    const likeKeywords = [];
    const criteria = {};
    for(let i = 0; i < keywords.length; i++){
        likeKeywords[i] = {
            name: {
                [Op.like]: `%${keywords[i]}%`
            }
        }
    }
    criteria.where = {
        [Op.and]: likeKeywords
    }

    productRepository.fetchProductsByCriteria(criteria)
    .then(result => res.status(200).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in processing the request. Please try again after sometime!"
        });
    })
}

module.exports = {
    createProduct: createProduct,
    createMultipleProducts: createMultipleProducts,
    fetchProductsByName: fetchProductsByName,
    fetchProductById: fetchProductById,
    fetchProductsByCategoryId: fetchProductsByCategoryId,
    searchByKeyword: searchByKeyword
}