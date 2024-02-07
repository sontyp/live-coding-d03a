// Import von jwt für unsere Token-Operationen (Signieren, Verifizieren)
import jwt from "jsonwebtoken";

// Import von bcrypt für das Hashen von Passwörtern und das Vergleichen von gehashten Passwörtern
import bcrypt from 'bcrypt';

// Import des User-Models
import User from "../model/user.model.js";
import { USER_ROLES } from "../model/user.model.js";


export async function registerNewUser(req, res) {
    // Destrukturiere den Body in einzelne Bestandteile
    const {username, password} = req.body;

    // Erstelle Passwort-Hash (Verschlüsseltes Passwort)
    const pwHash = await bcrypt.hash(password, 10);

    // Erstelle neue User-Instanz standardmaessig mit Userrolle 'user'
    const newUser = new User({
        username,
        password: pwHash,
        role: USER_ROLES.user
    });

    // Versuche neue User-Instanz zu speichern
    try {
        // Speichere Model-Instanz
        const entry = await newUser.save();

        // Schicke entsprechenden Statuscode zusammen mit neuem Eintrag an Client zurück
        res.status(201).send({
            id: entry._id,
            username: entry.username,
            role: entry.role
        });


    } catch (error) {
        console.error(error);

        // Wenn Duplicate Error vorliegt (doppelte Einträge)
        if (error.code === 11000) {
            // Sende entsprechen Fehler zurück und brich ab
            res.status(409).send({
                error: `Username '${req.body.username}' already exists!`
            });
            return;
        }

        // Andere Validierungsfehler
        res.status(400).send({
            error: error.message
        });
    }
}

export async function loginUser(req, res) {
    // Extrahiere Logindaten aus Requestbody
    const {username, password} = req.body;

    try {
        // Versuche Usereintrag per Usernamen zu holen
        const userEntry = await User.findOne({username: username});

        // Prüfe, ob Usereintrag per Usernamen gefunden wurde
        if (!userEntry) {
            // Sende Fehler zurück
            res.status(401).send({
                message: 'Incorrect username or password'
            });

            // Brich vorzeitig ab
            return;
        }

        // Vergleiche gespeicherten Hash mit dem übergebenen Passwort
        if (!(await bcrypt.compare(password, userEntry.password))) {
            // Sende Fehler zurück
            res.status(401).send({
                message: 'Incorrect username or password'
            });

            // Brich vorzeitig ab
            return;
        }

        /* 
            Erstelle neuen Zugangstoken für eingeloggten User.
            IM DETAIL: Signiere mittels JsonWebToken eine freigewählte Payload.
            Die dabei entstehende Signatur beruht auf einem gut gesicherten Passwort/Secret.
            Es entsteht eine lange Zeichenkette (Hash), die bei Veränderungen keine Gültigkeit mehr aufweist.
            Es besteht auch die Möglichkeit eine Gültigkeitsdauer
            für diesen Token zu bestimmen. Nach Ablauf dieser Dauer
            gilt der Token zwar noch als korrekt, aber nicht mehr gültig.
        */
        const tokenPayload = {
            id: userEntry._id,
            username: userEntry.username,
            role: userEntry.role
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: 60 * 5  // 60 sek. * 5 Minuten = 5 Minuten
        });

        // Stelle HttpOnly Cookie für Token aus
        res.cookie('access_token', token, {
            httpOnly: true, // als HTTP-Only Cookie setzen (nicht per JS erreichbar im Browser)
            maxAge: 1000 * 60 * 60 // 1000 ms * 60 sek. * 60 min = Eine Stunde
        });

        // Sende partiellen Usereintrag als Bestätigung zurück
        res.send({
            id: userEntry._id,
            username: userEntry.username,
            role: userEntry.role
        });

    } catch (error) {
        console.error(error);

        res.sendStatus(500);
    }
}


export async function logoutUser(req, res) {
    // Entferne httpOnly Cookie, so dass Token nicht mehr verfuegbar ist
    res.clearCookie('access_token').send({
        message: 'Logged out successfully!'
    });
}