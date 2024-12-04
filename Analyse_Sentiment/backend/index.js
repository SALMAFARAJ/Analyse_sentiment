import express from 'express';
import cassandra from 'cassandra-driver';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuration Cassandra
const client = new cassandra.Client({
  contactPoints: ['localhost'], // Remplacez par l'adresse IP du conteneur si nécessaire
  localDataCenter: 'datacenter1',
  keyspace: 'your_keyspace', // Remplace par ton keyspace Cassandra
});

// Endpoint pour récupérer les données
app.get('/data', async (req, res) => {
  const query = 'SELECT * FROM your_table';
  try {
    const result = await client.execute(query);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des données' });
  }
});

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
