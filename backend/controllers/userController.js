const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d'})
}
// login users
const loginUser = async (req, res) => {
    res.json({ message: 'Login User' });
}


// signup users
const signupUser = async (req, res) => {
    try {
        const { email, user_name, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const user = new User({ email, user_name, password: password_hash });
        await user.save();

        // create a JWT token 
        const token = createToken(user._id);

        res.status(200).json({ user_name, token });
    } catch (e) {
        console.log(`Error : ${e.message}`);
        res.status(500).json({ Error: e.message });
    }
}

module.exports = {
    loginUser,
    signupUser,
}
