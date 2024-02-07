# `React` Boilerplate mit `Vite` als Bundler #

Dieses Projekt dient als wiederverwendbare Boilerplate für zukünftige `react` Projekte.
Sie nutzt `vite` als Bundler und basiert auf dem `react`-Template von `vite-create`.

## Setup ##
Nachdem das Projekt kopiert wurde, kann es mit folgendem Befehl installiert werden:

```
npm install
```

Sobald der `npm`-Installationsprozess durchgelaufen ist, kann das Projekt mit folgendem Befehl gestartet werden:

```
npm run dev
```

Der Browser sollte automatisch die Page öffnen und im Terminal sollte eine Ausgabe wie folgt erscheinen:

```
  VITE v4.3.9  ready in 194 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Aufbau ##
Die Programmier-Arbeit findet hauptsächlich im `/src`-Ordner statt.
Dieser teilt sich wie folgt auf:
- `/assets` - für Bilder, etc., die innerhalb der App eingebunden werden sollen
- `/css` - für alle `.css` oder sogar `.scss` Dateien
- `/js` - für alles, das mit *JavaScript* zu tun hat. Dazu gehören Komponenten, Hooks, Services, etc.
    - `/js/components` - designiert für alle `.jsx`-Dateien, die Komponenten beherrbergen

