import Role from "../models/role.model.js";
import User from "../models/user.model.js";
import { connectToDb } from "./db.service.js";

export async function seedRoles() {
    const regularRole = new Role({
        label: 'Regular user',
        privilegeLevel: 3,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: false,
        canDelete: false
    });

    const modRole = new Role({
        label: 'Moderator',
        privilegeLevel: 2,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: true,
        canDelete: false
    });

    const adminRole = new Role({
        label: 'Administrator',
        privilegeLevel: 1,
        canRead: true,
        canWriteSelf: true,
        canWriteOthers: true,
        canDelete: true
    });

    const blockedRole = new Role({
        label: 'Deactivated user',
        privilegeLevel: 4,
        canRead: false,
        canWriteSelf: false,
        canWriteOthers: false,
        canDelete: false
    });


    try {
        console.log('Deleting all role entries...');
        // Raeume Collection komplett auf!
        await Role.deleteMany();

        const roles = [];

        // Trage Beispieleintraege ein
        roles.push(await regularRole.save());
        console.log('Saved regularRole to DB!');

        roles.push(await modRole.save());
        console.log('Saved modRole to DB!');

        roles.push(await adminRole.save());
        console.log('Saved adminRole to DB!');

        roles.push(await blockedRole.save());
        console.log('Saved blockedRole to DB!');

        return roles;

    } catch (error) {
        console.error(error);
    }
}


export async function seedUsers(roles) {
    const someRegular = new User({
        username: 'regular',
        password: 'geheim',
        location: 'Hamburg',
        role: roles[0]._id
    });

    const someMod = new User({
        username: 'mod',
        password: 'geheim',
        location: 'Berlin',
        role: roles[1]._id
    });

    const someAdmin = new User({
        username: 'admin',
        password: 'geheim',
        location: 'Berlin',
        role: roles[2]._id
    });

    const someBlocked = new User({
        username: 'blocked',
        password: 'geheim',
        location: 'Muenchen',
        role: roles[3]._id
    });

    const someOtherRegular = new User({
        username: 'regular2',
        password: 'geheim',
        location: 'Hamburg',
        role: roles[0]._id
    });


    try {
        console.log('Deleting all user entries...');
        await User.deleteMany();

        await someRegular.save();
        console.log('Saved someRegular to DB!');

        await someMod.save();
        console.log('Saved someMod to DB!');

        await someAdmin.save();
        console.log('Saved someAdmin to DB!');

        await someBlocked.save();
        console.log('Saved someBlocked to DB!');

        await someOtherRegular.save();
        console.log('Saved someOtherRegular to DB!');

    } catch (error) {
        console.error(error);
    }
}


async function seed() {
    try {
        console.log('Connecting to DB...');
        // Baue Verbindung zur Datenbank auf
        await connectToDb();

        // Seede Userrolleneintraege
        const roles = await seedRoles();
        // Seede Usereintraege
        await seedUsers(roles);

        process.exit(0);
    } catch (error) {
        console.error(error);
    }
}

await seed();

// export default seed;