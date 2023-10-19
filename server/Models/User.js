import mongoDB from 'mongoose';

const userSchema = new mongoDB.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true });

const User = mongoDB.model('User', userSchema);

export default User;