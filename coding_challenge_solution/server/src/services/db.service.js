import mongoose from "mongoose";
import dotenv from 'dotenv';

if (!process.versions.node.startsWith('20.')) {
    dotenv.config();
}

// Servicefunktion zum Aufbauen der DB Verbindung
export async function connectToDb() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_URL}/?retryWrites=true&w=majority`, {
            dbName: process.env.DB_NAME
        });
        console.log('Connection to DB established!');

    } catch (error) {
        console.error(error);

        // Wenn Verbindung zur Datenbank nicht aufgebaut werden konnte,
        // beende die Serveranwendung
        process.exit(99);
    }
}