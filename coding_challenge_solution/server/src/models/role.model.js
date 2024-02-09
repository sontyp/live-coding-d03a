import {Schema, model} from 'mongoose';

const roleSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true,
        cast: false // verhindere, dass Zahlen oder Boolsche Werte automatisch in String gecastet werden
    },
    privilegeLevel: {
        type: Number,
        required: true
    },
    canRead: {
        type: Boolean,
        required: true
    },
    canWriteSelf: {
        type: Boolean,
        required: true
    },
    canWriteOthers: {
        type: Boolean,
        required: true
    },
    canDelete: {
        type: Boolean,
        required: true
    }
});

const Role = model('Role', roleSchema);

export default Role;