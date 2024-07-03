const Token = require("../models/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }
        
        if (!decoded) {
            throw new Error("Invalid token");
        }

        if (decoded.expiredAt < Date.now()) {
            throw new Error("Token expired");
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = authMiddleware;