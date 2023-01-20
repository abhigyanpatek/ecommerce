const { validateToken } = require("../../external/auth.service");

exports.validateAccessToken = (req, res, next) => {
    const authToken = req.headers['authorization'];
    if(!authToken){
        return res.status(401).send({
            message: "Token is required!"
        });
    }
    validateToken(authToken)
    .then(response => {
        if(response.status === 200){
            console.log("Successfully authenticated");
            req.user = response.data;
            next();
        } else if(response.status === 401){
            res.status(401).send(response.data);
        }
    }).catch(error => {
        res.status(500).send({
            message: "Unable to validate user. Please try again after sometime!"
        });
    })
}

exports.validateAdmin = (req, res, next) => {
    if(!(req.user && req.user.permission === "ADMIN")){
        res.status(403).send({
            message: "User doesn't have the required permissions"
        });
        return;
    }
    next();
}