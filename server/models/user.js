const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.methods.getPasswordHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

userSchema.methods.isValidPassword = function (password) {
   return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
