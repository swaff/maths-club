const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.getPasswordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.isValidPassword = (password) => bcrypt.compareSync(password, this.local.password);

module.exports = mongoose.model('User', userSchema);
