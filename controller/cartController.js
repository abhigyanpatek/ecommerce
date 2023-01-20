const cartRepository = require('../dao/repository/cart.repository');
const { Product } = require('../dao/repository/product.repository');
const { UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR } = require('../constants/errorConstants');

const createCart = (req, res) => {
    const cart = {
        username: req.user.username,
        cost: req.body.cost
    }
    cartRepository.createCart(cart)
    .then(result => {
        res.status(201).send(result);
    }).catch(error => {
        if(error.name === UNIQUE_KEY_CONSTRAINT_VALIDATION_ERROR){
            return res.status(409).send({
                message: `Cart already exists!`
            });
        }
        throw error;
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error in creating cart. Please try again after sometime!"
        });
    })
}

const updateCart = (req, res) => {
    cartRepository.fetchCartById(req.params.id)
    .then(cart => {
        if(!cart){
            return res.status(404).send({
                message: "Cart not found!"
            });
        }
        Product.findByPk(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).send({
                    message: "Product not found!"
                });
            }
            cart.addProduct(product.id, {through: {quantity: req.body.quantity}})
            .then(() => {
                cart.getProducts()
                .then(products => {
                    let cost = 0;
                    const productsSelected = [];
                    for(const product of products){
                        cost += product.price * product.cart_product.quantity;
                        productsSelected.push({
                            id: product.id,
                            name: product.name,
                            quantity: product.cart_product.quantity,
                            price: product.price
                        });
                    }
                    cart.cost = cost;
                    cart.save().then(() => {
                        res.status(200).send({
                            id: cart.id,
                            productsSelected,
                            cost
                        });
                    })
                })
            })
        })
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in updating cart. Please try again after sometime!"
        });
    })
}

const removeProductInCart = (req, res) => {
    cartRepository.fetchCartById(req.params.id)
    .then(cart => {
        if(!cart){
            return res.status(404).send({
                message: "Cart not found!"
            });
        }
        if(!req.body.productId){
            cart.cost = 0;
            Promise.all([cart.setProducts([]), cart.save()])
            .then(() => {
                res.status(200).send({
                    id: cart.id,
                    productsSelected: [],
                    cost: cart.cost
                });
            })
        }else {
            cart.removeProduct(req.body.productId)
            .then(() => {
                cart.getProducts()
                .then(products => {
                    let cost = 0;
                    const productsSelected = [];
                    for(const product of products){
                        cost += product.price*product.cart_product.quantity;
                        productsSelected.push({
                            id: product.id,
                            name: product.name,
                            quantity: product.cart_product.quantity,
                            price: product.price
                        });
                    }
                    cart.cost = cost;
                    cart.save().then(() => {
                        res.status(200).send({
                            id: cart.id,
                            productsSelected,
                            cost: cart.cost
                        });
                    })
                })
            })
        }
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in removing products. Please try again after sometime!"
        });
    })
}

const getCart = (req, res) => {
    cartRepository.fetchCartById(req.params.id)
    .then(cart => {
        if(!cart){
            return res.status(404).send({
                message: "Cart not found!"
            });
        }
        cart.getProducts()
        .then(products => {
            const productsSelected = [];
            for(const product of products){
                productsSelected.push({
                    id: product.id,
                    name: product.name,
                    quantity: product.cart_product.quantity,
                    price: product.price
                });
            }
            res.status(200).send({
                id: cart.id,
                productsSelected,
                cost: cart.cost
            });
        })
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Error occured in fetching cart. Please try again after sometime!"
        });
    })
}

module.exports = {
    createCart, 
    updateCart,
    removeProductInCart,
    getCart
}