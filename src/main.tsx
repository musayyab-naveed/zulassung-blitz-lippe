import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
// Schriften liegen auf unserem eigenen Server statt bei Google Fonts –
// so wird beim Seitenaufruf keine IP-Adresse an Google übertragen.
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/sora/800.css'
import './index.css'

const root = document.getElementById("root")!;
// Seiten aus dem Build bringen ihren Inhalt schon mit – React übernimmt ihn
// dann nur (hydrate), statt alles neu aufzubauen. Mit Parametern in der
// Adresse (z. B. /angebot?vorgang=...) passt der gespeicherte Inhalt nicht,
// dann wird die Seite normal neu aufgebaut.
if (root.hasChildNodes() && !window.location.search) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}
