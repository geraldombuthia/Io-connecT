const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Pre-save hook to hash the password before saving the user
UserSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10); //Generate a salt

            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

UserSchema.index({email: 1, username: 1}, {unique: true});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error('Error comparing password');
    }
};

//create the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;