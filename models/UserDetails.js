const mongoose = require('mongoose');

const UserDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // This field is required
    },
    email: {
        type: String,
        required: true,  
        unique: true,   
        match: /.+\@.+\..+/ 
    },
    mobile: {
        type: Number,
        require: true
    }
});

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

module.exports = UserDetails;
