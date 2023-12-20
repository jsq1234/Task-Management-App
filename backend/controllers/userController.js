// login users
const loginUser = async (req, res) => {
    res.json({ message: 'Login User' });
}


// signup users

const signupUser = async (req, res) => {
    res.json({ message: 'Sign Up User' });
}

module.exports = {
    loginUser,
    signupUser,
}
