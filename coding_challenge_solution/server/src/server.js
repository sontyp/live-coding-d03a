import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './services/db.service.js';
// import { seedRoles, seedUsers } from './services/seed.service.js';
import userRouter from './routes/users.route.js';
import roleRouter from './routes/roles.route.js';

if (!process.versions.node.startsWith('20.')) {
    dotenv.config();
}

// Baue Verbindung zur Datenbank auf
await connectToDb();

// TODO lagere in eigenes Modul aus und mache npm Script dafuer
// Seede Userrolleneintraege
// const roles = await seedRoles();
// Seede Usereintraege
// await seedUsers(roles);

// Instanziiere Express
const app = express();

// TODO registriere authRouter fuer alle Endpoints auf /auth
// Registriere userRouter fuer alle Endpoints auf /users
app.use('/users', userRouter);
// Registriere roleRouter fuer alle Endpoints auf /roles
app.use('/roles', roleRouter);


// Starte Express Server auf PORT aus Enviroment Variables
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.SERVER_PORT}`);
});