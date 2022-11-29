const axios = require('axios').default;
axios.defaults.baseURL = 'http://localhost:4000';

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

module.exports = {
    getAuthToken,
    validateToken
}