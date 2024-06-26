const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiredAt: { type: Date }
});

module.exports = mongoose.model("Token", tokenSchema);
