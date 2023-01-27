const { join } = require('path');
const { root_path } = require('../globalConfig');
const User = require('../models/user');
const { JWT_ALGORITHM, HttpStatusCodes } = require("../utils/constants");
const jwt = require("jsonwebtoken");
const { create } = require("../models/user");


async function auth(req, res, next) {
    try {
        const token = String(req.headers["authorization"]).split(" ")[1]

        const privateKey = require('fs').readFileSync(join(root_path, 'private.key'));
        const decodedToken = jwt.verify(token, privateKey, { algorithms: [JWT_ALGORITHM] })

        const user = await User.findOne({ "_id": decodedToken?.id })
        if (user == null) {
            res.status(HttpStatusCodes.UNAUTHORIZED)
                .json({ message: "User Unathorized" })
            return;
        }
        req["user"] = user;
    } catch (error) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: "User Unauthorized" })
    }
    next()
}

module.exports = auth;