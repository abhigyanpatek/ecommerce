const dbConnection = require('./dbConnection');
const defineUser = require('../models/user.model');

const User = defineUser(dbConnection.connection, dbConnection.DataTypes);

const createUserTable = async (forceCreation) =>{
    await User.sync({force: forceCreation});
}

const registerUser = async (user) => {
    const dbUser = await User.create({
        username: user.username,
        firstName: user.firstname,
        lastName: user.lastName,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
        password: user.password
    });
    return {
        username: dbUser.username,
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber
    };
}

const fetchUserByCriteria = async (criteria) => {
    return User.findOne(criteria);
}

module.exports = {
    createUserTable: createUserTable,
    registerUser: registerUser,
    fetchUserByCriteria: fetchUserByCriteria,
    User
}