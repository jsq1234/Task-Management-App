const jwt = require('jsonwebtoken');
const User = require('../model/user');

const requireAuth = async (req, res, next) => {
    // verify authorization
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ Error: "Authorization token required." });
    }
    const [_, token] = authorization.split(' ');

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select({ _id });

        next();
    } catch (e) {
        console.log(e.message);
        return res.status(401).json({ Error: "Not authorized." });
    }

}

module.exports = requireAuth;