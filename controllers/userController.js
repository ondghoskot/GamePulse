const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({username, email, password: hashedPassword});
        await user.save();
        res.status(201).send({message: "User registered successfully"});
    } catch (error) {
        res.status(400).send({message : error.message});
    }
};

exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch)
            return res.status(400).send({ error: "Invalid email or password"});

        const token = jwt.sign({ userId: user._id}, "secretkey");
        const saveToken = new Token({
            userId: user._id,
            token: token
        });
        await saveToken.save();
        res.send({ message: "Logged in successfully" });
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};