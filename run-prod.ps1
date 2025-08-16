<#
Erstellt einen Produktionsbuild und dient die Dateien lokal aus.
Eine vorhandene PORT-Variable legt den Port fest, sonst wird 8080 verwendet.
#>

$ErrorActionPreference = 'Stop'

# Arbeitsverzeichnis auf den Ordner setzen, in dem das Skript liegt
Set-Location $PSScriptRoot

# Abhängigkeiten neu installieren
npm ci

# Produktionsbuild erzeugen
npm run build -- --configuration production

# Statische Dateien bereitstellen
$port = if ($env:PORT) { $env:PORT } else { 8080 }
npx serve -l $port dist/konzertkompass
