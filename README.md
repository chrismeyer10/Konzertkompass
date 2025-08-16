# Konzertkompass

## Getting Started

1. Install a current Node.js LTS version.
2. Copy `.env.example` to `.env` and replace the placeholder with your Google OAuth client ID.

### Development server

```powershell
\.\start-dev.ps1
```

Das Skript installiert Abhängigkeiten und startet den Angular-Entwicklungsserver auf <http://localhost:4200>.

### Production build served locally

```powershell
\.\run-prod.ps1
```

Dies führt `npm ci` aus, baut die Anwendung für die Produktion und dient `dist/konzertkompass` über [`serve`](https://www.npmjs.com/package/serve) auf <http://localhost:8080>. Einen anderen Port legen Sie mit `$env:PORT=3000; .\run-prod.ps1` fest.

After logging in you can manage your band list.

## Deployment notes

For production deployments you can copy the content of `dist/konzertkompass`
to a web server such as Nginx:

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/dist/konzertkompass;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Run `sudo nginx -t` and `sudo systemctl reload nginx` to apply the configuration.

## License

© 2024 Christian Meyer. All rights reserved.
