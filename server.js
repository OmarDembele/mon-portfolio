const express = require('express');
const path = require('path');

const app = express();

// Pour servir les fichiers statiques à partir du dossier dist
app.use(express.static(__dirname + '/dist/portfolio-omar'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: '/dist/portfolio-omar/'});
});

// Démarrer le serveur sur le port défini par Heroku ou sur le port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
