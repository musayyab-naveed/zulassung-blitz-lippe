# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/34c04f77-c604-4f6a-a573-f213c7da366a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/34c04f77-c604-4f6a-a573-f213c7da366a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/34c04f77-c604-4f6a-a573-f213c7da366a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## SMTP-Weiterleitung (Zoho) für Formularanfragen

Für die Weiterleitung von Anfragen an `info@sofortzulassung.com` ist ein kleiner API-Service enthalten:

- `POST /api/cal/webhook` für Cal.com Webhooks
- `POST /api/lead` für manuelle Website-Formulare

### 1) Umgebungsvariablen setzen

```sh
cp .env.example .env
```

Dann in `.env` die SMTP-Daten eintragen:

- `SMTP_USER=info@sofortzulassung.com`
- `SMTP_PASS=<Zoho App Password>`
- `LEAD_RECEIVER=info@sofortzulassung.com`
- optional `CAL_WEBHOOK_SECRET=<dein webhook secret>`

Zoho Hinweise:

- Nutze ein **App Password** (kein normales Zoho-Login-Passwort).
- Host/Port:
  - EU meist `smtppro.zoho.eu` oder
  - global `smtppro.zoho.com`
  - Port `587`, `SMTP_SECURE=false`
- Falls dein Account nur SSL nutzt: Port `465`, `SMTP_SECURE=true`.

### 2) API starten

```sh
npm run dev:api
```

Health-Check:

```sh
curl http://localhost:8787/api/health

SMTP Testmail auslösen:

```sh
curl -X POST http://localhost:8787/api/smtp/test
```
```

### 3) Cal.com verbinden

In Cal.com beim Event einen Webhook anlegen:

- URL: `https://<deine-domain>/api/cal/webhook`
- Events: Buchung erstellt/verschoben/storniert (nach Bedarf)
- Secret: identisch zu `CAL_WEBHOOK_SECRET`

Danach werden Buchungsdaten per SMTP an `info@sofortzulassung.com` gesendet.

## Netlify Deployment

Auf Netlify läuft der lokale Express-Server (`server/index.js`) nicht dauerhaft.  
Für Produktion sind daher Netlify Functions eingerichtet:

- `/api/health` -> `/.netlify/functions/health`
- `/api/lead` -> `/.netlify/functions/lead`
- `/api/smtp/test` -> `/.netlify/functions/smtp-test`

In Netlify unter **Site settings -> Environment variables** setzen:

- `SMTP_HOST` (z. B. `smtppro.zoho.eu`)
- `SMTP_PORT` (`587`)
- `SMTP_SECURE` (`false`)
- `SMTP_USER` (`info@sofortzulassung.com`)
- `SMTP_PASS` (Zoho App Password)
- `SMTP_FROM` (`info@sofortzulassung.com`)
- `LEAD_RECEIVER` (`info@sofortzulassung.com`)
- `CAL_WEBHOOK_SECRET` (optional, für Webhook-Signatur)
