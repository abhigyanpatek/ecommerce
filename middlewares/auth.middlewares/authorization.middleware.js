const { validateToken } = require("../../external/auth.service");

exports.validateAccessToken = (req, res, next) => {
    const authToken = req.headers['authorization'];
    validateToken(authToken)
    .then(response => {
        if(response.status === 200){
            console.log("Successfully authenticated");
            req.user = response.data;
            next();
        } else if(response.status === 403){
            res.sendStatus(403);
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