// Import der wichtigen Module/Pakete
import dotenv from "dotenv";
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';

// Lade Enviroment Variablen aus der .env Datei
dotenv.config();

// Import eigener Module
import { connectToDb } from './service/db.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';


// Initialisierung des Servers
const app = express();

// Globale Middleware registrieren
app.use(express.json());
app.use(cookieParser()); // Zum Extrahieren von vom Client gesendeten Cookies

// Definiere die benoetigten CORS Optionen, um ein Frontend an den Server anzuschliessen
const corsOptions = {
    "origin": "http://localhost:5173", // Konfiguration fuer erlaubte Zugriffsquellen (* heisst alle duerfen)
    "credentials": true, // Erlaube, dass ein Cookie mit Token im Header mit versendet werden kann
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", // erlaubte HTTP Methoden bei Zugriffen
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));

// Verbinde mit Datenbank
await connectToDb();


// ------------------------------------------- Eigene Middleware Funktionen -------------------------------------------


// ------------------------------------------- Router Definitionen -------------------------------------------
app.use('/auth', authRouter);
app.use('/users', userRouter);


// Starte des Server
app.listen(process.env.PORT, () => {
    console.log(`😊 Server running on http://localhost:${process.env.PORT}/`);
});
