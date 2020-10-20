const jwtPromised = require("./jwt-promised");
module.exports = (secret, errorHandler) => (req, res, next) => {
    if (req.header("authorization")) {
        try {
            const [, token] = req.header("authorization").split(" ");
            jwtPromised
                .verify(token, secret)
                .then((payload) => {
                req.payload = payload;
                next();
            })
                .catch((error) => errorHandler(error, res));
        }
        catch (error) {
            errorHandler(error, res);
        }
    }
    else {
        next();
    }
};
