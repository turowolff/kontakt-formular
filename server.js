const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// POST-Route für das Kontaktformular
app.post('/kontakt', (req, res) => {
  const { name, email, nachricht } = req.body;

  console.log(req.body);


  // Simples Logging in eine Textdatei (anstatt Datenbank)
  const eintrag = `Name: ${name}, E-Mail: ${email}, Nachricht: ${nachricht}\n`;
  fs.appendFileSync('kontakte.txt', eintrag);

  res.send(`<h2>Danke für deine Nachricht, ${name}!</h2><a href="/">Zurück</a>`);
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
