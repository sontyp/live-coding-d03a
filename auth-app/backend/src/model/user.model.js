import { Schema, model } from "mongoose";

// Userrollen ENUM
export const USER_ROLES = {
    user: 'user',
    admin: 'admin'
};

// Definiere DB Schema für Usereinträge
const userSchema = new Schema({
    username: {
        type: String,
        required: true, // Feld MUSS vorhanden sein
        unique: true, // Werte für dieses Feld müssen in der Collection einzigartig sein
        cast: false // verhindere, dass Zahlen oder Boolsche Werte automatisch in String gecastet werden
    },
    password: {
        type: String,
        required: true,
        cast: false
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.user
    }
});


// Erstelle Model-Instanz für User-Collection
const User = model('user', userSchema);


export default User;