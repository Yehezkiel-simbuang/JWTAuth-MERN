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
    },
    photourl: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'
    },
}, { timestamps: true });

const User = mongoDB.model('User', userSchema);

export default User;