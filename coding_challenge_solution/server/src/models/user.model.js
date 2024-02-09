import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        cast: false // verhindere, dass Zahlen oder Boolsche Werte automatisch in String gecastet werden
    },
    password: {
        type: String,
        required: true,
        cast: false // verhindere, dass Zahlen oder Boolsche Werte automatisch in String gecastet werden
    },
    location: String,
    role: {
        type: Schema.Types.ObjectId, ref: 'Role',
        required: true
    }
});

const User = model('User', userSchema);

export default User;