const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Stoner@69',
  database: 'world',
});

// Connect to MySQL
connection.connect();
app.use(cors());
app.use(bodyParser.json()); // Add this line to parse JSON data in the request body

// Define API endpoint to fetch matches
app.get('/matches', (req, res) => {
  const query = 'SELECT matches, time, venue, format FROM matches WHERE time >= CURRENT_TIMESTAMP ORDER BY time ASC';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching matches:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint for user registration
app.post('/register', (req, res) => {
  const { fullname, mobile, email, password, username } = req.body;

  // Validate the presence of required fields
  if (!fullname || !mobile || !email || !password || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Example query for user registration (replace with your actual table/column names)
  const registerQuery = 'INSERT INTO users (fullname, mobile, email, password, username) VALUES (?, ?, ?, ?, ?)';
  const values = [fullname, mobile, email, password, username];

  connection.query(registerQuery, values, (registerError, registerResults) => {
    if (registerError) {
      console.error('User registration error:', registerError);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully', userId: registerResults.insertId });
    }
  });
});app.get('/players/:match_id', (req, res) => {
  const matchId = req.params.match_id;

  // SQL query to fetch players for the given match_id
  const query = `
    SELECT players.player_id, players.name, players.role, players.credits,players.src,players.Isselected,players.currentpoints
    FROM matches
    JOIN teams AS teamA ON matches.teamA_id = teamA.team_id
    JOIN players ON teamA.team_id = players.team_id
    WHERE matches.match_id = ?;

    SELECT players.player_id, players.name, players.role, players.credits
    FROM matches
    JOIN teams AS teamB ON matches.teamB_id = teamB.team_id
    JOIN players ON teamB.team_id = players.team_id
    WHERE matches.match_id = ?;
  `;

  connection.query(query, [matchId, matchId], (error, results) => {
    if (error) {
      console.error('Error fetching players:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Combine the results from both queries into a single array
      const allPlayers = [...results[0], ...results[1]];
      res.json(allPlayers);
    }
  });
});


// Close MySQL connection when the server is stopped
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
