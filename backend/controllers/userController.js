const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' })
}
// login users
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Incorrect email.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password.');
        }

        const token = createToken(user._id);

        res.status(200).json({ email, token });

    } catch (error) {
        console.log(`Error : ${error.message}`);
        res.status(400).json({ Error: error.message });
    }

}


// signup users
const signupUser = async (req, res) => {
    try {
        const { email, user_name, password } = req.body;

        // Check if the user has already signed up by using his/her email
        const exists = await User.findOne({ email });

        if (exists) {
            throw new Error('Email already in use.');
        }

        // create hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        const user = new User({ email, user_name, password: password_hash });
        await user.save();

        // create a JWT token 
        const token = createToken(user._id);

        // send the JWT token so that the frontend can use it.
        res.status(200).json({ email, token });

    } catch (e) {
        console.log(`Error : ${e.message}`);
        res.status(500).json({ Error: e.message });
    }
}

module.exports = {
    loginUser,
    signupUser,
}
