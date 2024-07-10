const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//method for signing up auth
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({firstName, lastName, email, password: hashedPassword});
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const expiryDate = new Date( Date.now() + 3600000);
        const saveToken = new Token({
            userId: user._id,
            token: token,
            expiredAt: expiryDate
        });
        await saveToken.save();

        res.status(201).send({
          message: "User registered successfully",
          jwt: token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
    } catch (error) {
        res.status(400).send({message : error.message});
    }
};

//method for logging in auth
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);

        if (!user || !isMatch)
            return res.status(400).send({ error: "Invalid email or password"});

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        const expiryDate = new Date( Date.now() + 3600000);
        const saveToken = new Token({
            userId: user._id,
            token: token,
            expiredAt: expiryDate
        });
        await saveToken.save();
        res.send({
            message: "User logged in successfully",
            jwt: token,
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email
            }
         });
    } catch (error) {
        res.status(400).send({message: error.message});
    }
};

//method to get user info
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};