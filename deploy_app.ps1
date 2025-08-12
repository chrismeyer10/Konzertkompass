<#
Skript zum Bauen und Bereitstellen der Anwendung auf GitHub Pages.

Voraussetzungen:
- Windows mit PowerShell
- Node.js und npm sind installiert
- Git ist installiert und `origin` zeigt auf dein GitHub-Repository
- `.env` existiert und enthält `NG_APP_GOOGLE_CLIENT_ID`

Was noch manuell auf GitHub zu tun ist (nur beim ersten Mal):
1. Im Browser dein Repository aufrufen.
2. **Settings → Pages** öffnen.
3. Als Quelle den Branch **gh-pages** auswählen und speichern.
   Danach ist die Seite unter `https://<Benutzername>.github.io/<Repo>/` erreichbar.

Benutzung:
`PowerShell> .\deploy_app.ps1`
#>

$ErrorActionPreference = 'Stop'

# Arbeitsverzeichnis auf den Ordner setzen, in dem das Skript liegt
Set-Location $PSScriptRoot

# Repo-Name und GitHub-User aus der remote-URL bestimmen
$repoName = (git rev-parse --show-toplevel | Split-Path -Leaf)
$remoteUrl = git remote get-url origin
$gitUser = if ($remoteUrl -match '[:/]([^/]+)/'+[regex]::Escape($repoName)+'.git$') { $matches[1] } else { '' }

Write-Host "Repository: $repoName"

# Frontend bauen
Write-Host 'Installiere Abhängigkeiten und erstelle Produktionsbuild...'
Push-Location frontend
npm ci
npm run build -- --configuration production --base-href "/$repoName/"
Pop-Location

# Build in temporären Ordner kopieren
$buildSource = "frontend/dist/frontend"
$tempDir = New-Item -ItemType Directory -Path (Join-Path $env:TEMP ([System.IO.Path]::GetRandomFileName()))
Copy-Item -Path (Join-Path $buildSource '*') -Destination $tempDir -Recurse

# aktuellen Branch merken
$currentBranch = git rev-parse --abbrev-ref HEAD

Write-Host 'Erzeuge Branch gh-pages und übertrage Build...'
# vorhandenen Branch löschen, falls vorhanden
if (git show-ref --verify --quiet refs/heads/gh-pages) { git branch -D gh-pages }
git checkout --orphan gh-pages
# Index und Arbeitsverzeichnis leeren, .git behalten
git rm -rf --quiet .
Get-ChildItem -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force

# Build aus Temp-Ordner kopieren
Copy-Item -Path (Join-Path $tempDir '*') -Destination . -Recurse

# Commit und Push


# Cleanup Temp
Remove-Item -Recurse -Force $tempDir

# Dateien zum Commit hinzufügen
git add .
git commit -m 'Deploy to GitHub Pages'
git push -f origin gh-pages

# Zurück zum ursprünglichen Branch wechseln
git checkout $currentBranch

if ($gitUser) {
    Write-Host "Aktiviere GitHub Pages unter: https://github.com/$gitUser/$repoName/settings/pages"
    Write-Host "Nach wenigen Minuten ist die Seite unter https://$gitUser.github.io/$repoName/ erreichbar."
} else {
    Write-Host 'Aktiviere GitHub Pages im Repository (Settings -> Pages).'
}

Write-Host 'Fertig.'
