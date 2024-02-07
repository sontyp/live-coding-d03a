# User Roles Authentication #
## Projekt installieren ##
```
npm install
```
## Server starten ##
```
npm run dev
```
> In `./misc/insomnia_collection.json` findest du eine importierbare Insomnia Collection.

## Aufgabe ##
Der bestehende Auth-Server soll um eine User-Rollen Funktionalität erweitertert werden.
Ziel der Aufgabe ist es, sicherer im Umgang mit Token-basierter Authentifikation/Authorisierung zu werden und die Struktur dahinter zu verinnerlichen.

1. Verschaffe dir noch einmal einen Überblick über die Struktur des Projekts.
2. Um die Funktionalität von User-Rollen zu implementieren, müssen die Usereinträge in der DB einen Verweis auf eine Rolle vorsehen.
Erweitere hierfür das Userschema um ein entsprechendes Feld z.B. `role`, das als einfaches String-Feld behandelt werden kann.
    > Um dir das Leben einfacher zu machen, lege an einer geeigneten Stelle ein `Enum` (ein Javascript Objekt reicht dafür) an, dass die verschiedenen Rollen darstellt. Die Rollen `user` und `admin` reichen bereits, aber du kannst auch mehr hinzufügen, wenn du willst.

3. Sorge dafür, dass beim Anlegen eines User (`/register`) dem Usereintrag direkt eine Userrolle hinzugefügt wird.
4. Erweitere die Token-Payload im Login-Endpoint (`/login`) um die Userrolle.
5. Erweitere die User-Endpoints um einen `PUT`-Endpoints zum bearbeiten eines einzelnen Usereintrags. Dieser dient dazu, dass der User seinen/ihren Usernamen oder auch sein/ihr Passwort ändern kann.
Dafür muss sichergestellt werden, dass nur der entsprechende User diesen Endpoint für den eigenen Eintrag verwenden kann.
    1. Um das ganze spannender zu gestalten und dafür zu sorgen, dass das Rollensystem auch wirklich zum Tragen kommt, soll es auch möglich sein, dass User mit der Rolle `admin` auch fremde Einträge bearbeiten dürfen.
    2. (Bonus) Admins sollen zwar in der Lage sein, die Daten anderer `user` zu ändern, allerdings nicht die anderer `admins`.