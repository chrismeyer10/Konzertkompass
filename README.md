# Konzertkompass

## Getting Started

1. Install a current Node.js LTS version.
2. Copy `.env.example` to `.env` and replace the placeholder with your Google OAuth client ID.

### Development server

```bash
./start-dev.sh
```

The script installs dependencies and launches the Angular dev server on <http://localhost:4200>.

### Production build served locally

```bash
./run-prod.sh
```

This performs a clean install, builds the app with the production configuration
and serves `dist/frontend` via [`serve`](https://www.npmjs.com/package/serve)
on <http://localhost:8080>. Set a different port using
`PORT=3000 ./run-prod.sh`.

### Manual development steps (alternative)

#### macOS/Linux
```bash
cd frontend
export NG_APP_GOOGLE_CLIENT_ID=your-google-client-id
npm start
```

#### Windows PowerShell
```powershell
cd frontend
$env:NG_APP_GOOGLE_CLIENT_ID="your-google-client-id"
npm start
```

After logging in you can manage your band list.

## Deployment notes

For production deployments you can copy the content of `frontend/dist/frontend`
to a web server such as Nginx:

```nginx
server {
    listen 80;
    server_name example.com;
    root /path/to/dist/frontend;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Run `sudo nginx -t` and `sudo systemctl reload nginx` to apply the configuration.

## License

© 2024 Christian Meyer. All rights reserved.
