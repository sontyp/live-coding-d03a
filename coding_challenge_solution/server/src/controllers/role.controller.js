import Role from "../models/role.model.js";

export async function getAll(req, res) {
    const roles = await Role.find();

    res.send(roles);
}