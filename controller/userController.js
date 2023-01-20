const bcrypt = require('bcrypt');
const userRepository = require('../dao/repository/user.repository');
const authService = require('../external/auth.service');

const encryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const authenticateUser = async(password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

const registerUser = (req, res) => {
    // validations

    encryptPassword(req.body.password)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        return userRepository.registerUser(req.body);
    }).then(result => res.status(201).send(result))
    .catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Some error occured at the time of registration. Please try again after sometime!"
        });
    }) 
}

const login = (req, res) => {
    // validations
    userRepository.fetchUserByCriteria({
        where: {
            username: req.body.username
        }
    }).then(async (user) => {
        const isValid = await authenticateUser(req.body.password, user.password);
        return isValid? user: undefined;
    }).then(user => {
        if(!user){
            res.status(401)
            .send({message: "Invalid username or password!"});
            return;
        }

        return authService.getAuthToken({
            username: user.username,
            permission: user.permission
        });
    }).then(result => {
        res.status(200).send(result.data);
    }).catch(error => {
        console.log(error.message);
        res.status(500).send({
            message: "Some error occured at the time of login. Please try again after sometime!"
        });
    })
}

const logout = (req, res) => {
    if(!req.headers['authorization']){
        return res.status(400).send({
            message: "Token is missing!"
        });
    }
    authService.deleteToken(req.headers['authorization'])
    .then(response => {
        if(response.status === 200){
            res.status(200).send({
                message: "You logged out successfully!"
            });
        } else if(response.status === 401){
            res.status(401).send(response.data);
        }
    }).catch(error => {
        res.status(500).send(error.response.data);
    })
}

module.exports = {
    registerUser: registerUser,
    login: login,
    logout
}