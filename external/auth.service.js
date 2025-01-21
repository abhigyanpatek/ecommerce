const axios = require('axios').default;
axios.defaults.baseURL = process.env.AUTH_API_BASE_URL;

const getAuthToken = async (payload) => {
    const headers = {
        "Content-Type": "application/json"
    };
    return await axios.post("/auth/getUserToken", payload, {headers});
}

const validateToken = async (bearerToken) => {
    const headers = {
        "Authorization": bearerToken
    };
    const validateStatus = (status) => {
        // Resolve only if the status code is less than 500
        return status < 500;
    }
    return await axios.get("/auth/validate", {headers, validateStatus});
}

const deleteToken = async (bearerToken) => {
    const headers = {
        "Authorization": bearerToken
    }
    return await axios.get("/auth/deleteUserToken", {headers});
}

module.exports = {
    getAuthToken,
    validateToken,
    deleteToken
}