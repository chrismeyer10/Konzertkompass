<#
Startet den Angular-Entwicklungsserver.
Liest Variablen aus einer lokalen .env-Datei und prüft
ob die benötigte Google OAuth Client-ID gesetzt ist.
#>

$ErrorActionPreference = 'Stop'

# Arbeitsverzeichnis auf den Ordner setzen, in dem das Skript liegt
Set-Location $PSScriptRoot

# .env-Datei einlesen und Umgebungsvariablen setzen
if (Test-Path '.env') {
  Get-Content '.env' | ForEach-Object {
    if ($_ -match '^([^#=]+)=(.*)$') {
      $name = $matches[1].Trim()
      $value = $matches[2].Trim()
      $env:$name = $value
    }
  }
}

if (-not $env:NG_APP_GOOGLE_CLIENT_ID) {
  throw 'NG_APP_GOOGLE_CLIENT_ID ist nicht gesetzt. Legen Sie eine .env-Datei an oder setzen Sie die Variable manuell.'
}

# Abhängigkeiten installieren und Entwicklungsserver starten
npm install
npm start
