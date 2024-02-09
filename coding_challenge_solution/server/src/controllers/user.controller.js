import User from "../models/user.model.js";

export async function getAll(req, res) {
    const users = await User.find().select('-password').populate('role');

    res.send(users);
}

// TODO getById

// TODO addNew
    // TODO bcrypt

// TODO updateById
    // TODO bcrypt
    
// TODO deleteById