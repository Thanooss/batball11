// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const cors=require("cors")
const bcrypt=require("bcrypt")
const port = 3001;
const bodyParser = require('body-parser');
const session = require('express-session');
app.use(session({
  secret: '69',
  resave: false,
  saveUninitialized:false,
}));

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
app.use(bodyParser.json());


// Define API endpoint to fetch matches
app.get('/matches', (req, res) => {
  const query = 'SELECT (select team_name from teams where matches.teamA_id=teams.team_id) as teamA,(select team_name from teams where matches.teamB_id=teams.team_id) as teamB,time,venue,format,match_id FROM matches  where time>=current_timestamp order by time asc '; // Adjust the query based on your database schema

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching matches:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});
  app.post('/register', (req, res) => {
  console.log(req.body)
  const { fullname, mobile, email, password, username } = req.body;
  const encryptedpassword=bcrypt.hashSync(password,6);
  

  // Validate the presence of required fields
  if (!fullname || !mobile || !email || !password || !username) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Example query for user registration (replace with your actual table/column names)
  const registerQuery = 'INSERT INTO users (fullname, mobile, email, password, username) VALUES (?, ?, ?, ?, ?)';
  const values = [fullname, mobile, email, encryptedpassword, username];

  connection.query(registerQuery, values, (registerError, registerResults) => {
    if (registerError) {
      console.error('User registration error:', registerError);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('User registered successfully');
      res.status(200).json({ message: 'User registered successfully', userId: registerResults.insertId });
    }
  });
});

app.get('/players/:match_id', (req, res) => {
  const matchId = req.params.match_id;
   console.log(matchId)

  const query = `
  select distinct player_id,src,name,credits,role,Isselected,currentpoints,teams.team_name,matches.teamA_id,matches.teamB_id,players.team_id from matches join teams on matches.teamA_id =teams.team_id or matches.teamB_id=teams.team_id
  join players on teams.team_id=players.team_id where match_id='${matchId}';
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching matches:', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
      
    }
  });

  // Execute the query with parameter binding
})
app.post('/login',(req,res)=>{
  const username=req.body.username;
  const password=req.body.password;
  //console.log(username) perfectly working
  //console.log(password)
  
  const query=`select username,password from users where username='${username}'`;
  connection.query(query,(error,results)=>{
    if(error){
      console.error("Error while validating",error)
      res.status(500).json({message:'internal server error'})
    }
    else{
      //console.log('OK') #drycoding
    
         if(results.length>0){
          const IsvalidPassword=bcrypt.compareSync(password,results[0].password);
          if(IsvalidPassword){
            const query=`select user_id from users where username='${username}'`;
            connection.query(query,(error,results)=>{
                if(error){
                  results.status(500).json({message:"internal server error"});
                }
                res.status(200).json({user_id:results[0].user_id})
            })
           
           
           
          }
          else{
            res.status(401).json({message:'invalid credentials'})
            const session=req.sessionID;
            console.log("on incorrect password  "+ session)
           
          }
         }
         else{
          res.status(404).json({message:'user notfound'})
          const session=req.sessionID;
          console.log("on invalid username"+ session)
       
         }
    }
   
  })
})
app.get('/contests/:match_id',(req,res)=>{
    const match_id=req.params.match_id;
    console.log(match_id);
    const query=`SELECT contest_id,contest_name,total_spots,spots_filled,winning_amount,entry_fee from contests where match_id='${match_id}'`
    connection.query(query,(error,result)=>{
        if(error){
            console.error('error while fetching data:',error)
            res.status(500).send('internal server error')
        }
        else{
            res.status(200).res.json(result)
            console.log(res.json(result))
        }

    })

})




// Close MySQL connection when the server is stopped
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
