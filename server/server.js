// server.js
const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require("cors")
const bcrypt = require("bcrypt")
const port = 3001;
const bodyParser = require('body-parser');
const session = require('express-session');
//const { toBePartiallyChecked } = require('@testing-library/jest-dom/matchers');
app.use(session({
  secret: '69',
  resave: false,
  saveUninitialized: false,
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
app.get('/user/matches', (req, res) => {
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
  const encryptedpassword = bcrypt.hashSync(password, 6);


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
      connection.query("select * from users where user_id=?",[registerResults.insertId],(err,user)=>{
        if(err){
          res.status(500).json({message:'internal server error'});
        }
        if(user.length==0){
          res.status(404).json({message:"user not found"})
        }
        if(user){
          res.status(200).json(user[0])
        }
      })
     // res.status(200).json({ message: 'User registered successfully', user_id: registerResults.insertId });
    }
  });
});
app.post('/user/matches/save-team', (req, res) => {
  console.log("saving team");
  const { player_Ids, match_id, user_id } = req.body;

  if (!Array.isArray(player_Ids) || player_Ids.length != 11) {
    return res.status(400).send("player ids must be an array of 11 ids");
  }

  console.log(match_id);

  connection.query('select * from user_teams where user_id=? and match_id=?', [user_id, match_id], (err, user_team) => {
    if (err) {
      return res.status(500).send("error while fetching user team data");
    }

    if (user_team.length > 0) {
      connection.query('select player1_id, player2_id, player3_id, player4_id, player5_id, player6_id, player7_id, player8_id, player9_id, player10_id, player11_id from user_teams where user_id=? and match_id=?', [user_id, match_id], (err, result) => {
        if (err) {
          return res.status(500).send("error while fetching players data");
        }

        console.log("total no of teams for a given user_id are : " + result.length);

        const currentTeamSorted = player_Ids.sort((a, b) => a - b);

        for (const team of result) {
          const existingTeam = [
            team.player1_id, team.player2_id, team.player3_id, team.player4_id, team.player5_id,
            team.player6_id, team.player7_id, team.player8_id, team.player9_id, team.player10_id, team.player11_id
          ].sort((a, b) => a - b);

          if (arraysAreEqual(existingTeam, currentTeamSorted)) {
            return res.status(400).send('duplicate team found');
          }
        }

        saveTeam();
      });
    } else {
      saveTeam();
    }

    function arraysAreEqual(arr1, arr2) {
      if (arr1.length != arr2.length) {
        return false;
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
          return false;
        }
      }
      return true;
    }

    function saveTeam() {
      connection.query('select username from users where user_id=?', user_id, (err, result) => {
        if (err) {
          return res.status(404).send("error while fetching user details");
        }

        if (result.length <= 0) {
          return res.status(404).send("username not found");
        }

        const team_name = result[0].username;

        const query = 'select team_name from user_teams where user_id=? AND match_id=?';
        connection.query(query, [user_id, match_id], (err, results) => {
          if (err) {
            console.error("Error while fetching existing teams");
            return res.status(500).send("internal server error");
          }

          let maxSuffix = 0;
          results.forEach(team => {
            const match = team.team_name.match(/\((\d+)\)$/);
            if (match) {
              const suffix = parseInt(match[1], 10);
              if (suffix > maxSuffix) {
                maxSuffix = suffix;
              }
            }
          });

          const newTeamName = `${team_name}(${maxSuffix + 1})`;

          const Insertquery = "insert into user_teams (user_id, match_id, team_name, player1_id, player2_id, player3_id, player4_id, player5_id, player6_id, player7_id, player8_id, player9_id, player10_id, player11_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          const values = [user_id, match_id, newTeamName, ...player_Ids];

          connection.query(Insertquery, values, (err, result) => {
            if (err) {
              return res.status(500).send("error while saving the team");
            }
            connection.query('select uteam_id from user_teams where user_id=? order by uteam_id desc limit 1', user_id, (err, result) => {
              if (err) {
                return res.status(500).send("error while fetching uteam_id");
              }
              if (!result) {
                return res.status(404).send("uteam_id not found")
              }
              console.log(result[0].uteam_id);
              return res.status(200).send(result[0])
            })

          });
        });
      });
    }
  });
});

// app.post('/user/matches/save-team', (req,res)=>{
//   let responseSent=false;
//   console.log("saving team");
//   const {player_Ids,match_id,user_id}=req.body
//   if(!Array.isArray(player_Ids)||player_Ids.length!=11){
//     return res.status(400).json({message:"player ids must be an array of 11 ids"})
//   }
//   console.log(match_id);

//   connection.query('select * from user_teams where user_id=? and match_id=?',[user_id,match_id],(err,user_team)=>{
//     if(err){
//       return res.status(500).send("error while fetching user team data")
//     }
//     if(user_team.length>0){ 
//     connection.query('select player1_id,player2_id, player3_id, player4_id, player5_id, player6_id, player7_id, player8_id, player9_id, player10_id, player11_id from user_teams where user_id=? and match_id=?',[user_id,match_id],(err,result)=>{
//            if(err){
//          return res.status(500).send("error while fetching players data");
//            }
//            console.log("total no of teams for a given user_id are : "+result.length)
//           //  if(result.length<=0){
//           //   if(!responseSent){
//           //   return res.status(404).send("error no players found in the team")
//           //  }
//           //  responseSent=true;
//           // }
//            const currentTeamSorted=player_Ids.sort((a,b)=>a-b);

//            for(const team of result){
//             const existingTeam = [
//               team.player1_id, team.player2_id, team.player3_id, team.player4_id, team.player5_id,
//               team.player6_id, team.player7_id, team.player8_id, team.player9_id, team.player10_id, team.player11_id].sort((a,b)=>a-b)
//               if(arraysAreEqaul(existingTeam,currentTeamSorted)){
//                 if(!responseSent){
//                 return res.status(400).send('duplicate team found');
//               }
//               responseSent=true;
//             }

//             }
//             function arraysAreEqaul(arr1,arr2){
//               if(arr1.length!=arr2.length){
//                 return false;
//               }
//               for(let i=0;i<arr1.length;i++){
//                 if(arr1[i]!=arr2[i]){
//                   return false;
//                 }
//               }
//               return true;
//             }

//     } )
//     }
//   connection.query('select username from users where user_id=?',user_id,(err,result)=>{
//     if(err){
//      return res.status(404).send("error while fetching user details")
//     }
//     // if(result.length<=0){
//     //   return res.status(404).send("username not found")
//     // }

//     const team_name=result[0].username;



//   // console.log(player_Ids.length)
//   // if(Array.isArray(player_Ids)){
//   //   console.log("playerids is an array")
//   // }

//    const query='select team_name from user_teams where user_id=? AND match_id=?';
//    connection.query(query,[user_id,match_id],(err,results)=>{
//     if(err){
//       console.error("Error while fetching existing teams");
//       return res.status(500).send("internal server error")
//     }


//     let maxSuffix=0;
//     results.forEach(team => {
//         const match = team.team_name.match(/\((\d+)\)$/);
//         if(match){
//         const suffix=parseInt(match[1],10);
//         if(suffix>maxSuffix){
//           maxSuffix=suffix;
//         }
//       }
//     })
//     const newTeamName=`${team_name}(${maxSuffix+1})`


//     const Insertquery="insert into user_teams (user_id,match_id,team_name,player1_id,player2_id,player3_id,player4_id,player5_id,player6_id,player7_id,player8_id,player9_id,player10_id,player11_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
//     const values=[user_id,match_id,newTeamName,...player_Ids];

//     connection.query(Insertquery,values,(err,result)=>{

//       if(err){
//         return res.status(500).send("error while saving the team")
//       }
//      return res.status(200).send("Team saved successfully")
//     }
//     )
//    })

//   })
// })
// })








app.get('/user/:user_id', (req, res) => {
  const requser_id = req.params.user_id;
  console.log("userId is" + requser_id);
  const query = `select * from users where user_id=${requser_id}`;
  connection.query(query, (error, results) => {

    if (error) {
      res.status(500).json({ error: error.message })
    }
    if (results.length == 0) {
      res.status(404).json({ message: "user not found" })
    }
    res.json(results[0])

  })
})

app.get('/user/matches/players/:match_id', (req, res) => {

  const matchId = req.params.match_id;

  console.log('match_id :'+matchId)
  const query = `
  select distinct player_id,src,name,credits,role,Isselected,currentpoints,teams.team_name,matches.teamA_id,matches.teamB_id,players.team_id from matches join teams on matches.teamA_id =teams.team_id or matches.teamB_id=teams.team_id
  join players on teams.team_id=players.team_id where match_id='${matchId}';
  `;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching matches:', error);
      res.status(500).send('Internal Server Error');
    } else {
      let data = res.json(results);
      
    }
  });

  // Execute the query with parameter binding
})
app.post('/join_contest', (req, res) => {
  console.log("I am in join_contest block")

  const user_id = req.body.user_id;
  const contest_id = req.body.contest_id;
  const match_id=req.body.match_id;
  console.log("user_id :"+user_id)
  console.log("contest_id :"+contest_id);
  console.log("match_id :"+match_id)
  connection.query("select * from contests where contest_id=?", contest_id, (err, contest) => {
    if (err) {
      return res.status(500).send("error while fetching contests")
    }
    if (!contest) {
      return res.status(404).send("error cannot find the contest")
    }
    const { spots_filled, entry_fee, total_spots } = contest[0];


    connection.query('Select * from users where user_id=?', user_id, (err, user) => {
      if (err) {
        return res.status(500).send("error while fetching user");
      }
      if (!user) {
        return res.status(500).send("error user not found");
      }
      const { balance } = user[0];
      if (balance < entry_fee) {
        return res.status(402).send("not enough balance")
      }
      if (spots_filled >= total_spots) {
        return res.status(403).send("contest is full");
      }
     
        let uteam_id = 0;
        connection.query('select uteam_id from user_teams where user_id=? and match_id=? order by uteam_id desc limit 1', [user_id,match_id], (err, uteams_id) => {
          console.log("I am in uteam_id block ")
          if (err) {
            return res.status(500).send('error while fetching user team_id');
          }
          if(uteams_id.length==0){
            return res.status(404).send("no teams found");
          }
          console.log("uteam_id is " + uteams_id[0].uteam_id)
          if (uteams_id.length == 0) {
            return res.status(400).send("user teams not found")
          }
          uteam_id = uteams_id[0].uteam_id;
        
 console.log("userteam_id :" + uteam_id + " contest_id :" + contest_id)
      connection.query('select ut.user_id from user_teams  as ut join contest_entries as ce on ut.uteam_id=ce.uteam_id where contest_id=?',[contest_id],(err,team_ids)=>{
         if(err){
          res.status(500).send('error while fetching user_teamids');
         }
         if(team_ids.length>0)
         if (team_ids.some(team_id => team_id.user_id === user_id)) {
          return res.status(500).send('Sorry, you have already joined this contest');
      }
      const updatedbalance = balance - entry_fee;
      connection.query('update users set balance=? where user_id=? ', [updatedbalance, user_id], (err, result) => {
        if (err) {
          return res.status(500).send(err.message);
        }
      
        connection.query('insert into contest_entries (uteam_id,contest_id) values(?,?)', [uteam_id, contest_id], (err, result) => {
          if (err) {
            return res.status(500).send(err.message)
          }
          const updatedspots = spots_filled + 1;
          connection.query("update contests set spots_filled=? where contest_id=?", [updatedspots, contest_id], (err, result) => {
            if (err) {
              return res.status(500).send('error while updaing contest details');
            }
            if (result) {
              connection.query('select * from contests where match_id=?',match_id, (err, results) => {
                console.log(" hi" + results)
                if (err) {
                  return res.status(500).send("error while fetching the updated contests")
                }
                if (!results) {
                  return res.status(404).send("cannot find the contests")
                }
                else {
                  return res.status(200).send(results);
                }
              })
            }
          })
        })
      })
    })
      })
    })
  })
})
app.get('/user/matches/contests/get_teams', (req, res) => {
  console.log(" I am in get teams block")
  const contest_id = req.query.contest_id;
  console.log(contest_id)
  if (!contest_id) {
    return res.status(404).send("contest_id not found");
  }
  connection.query('select ut.team_name,ut.player1_id,ut.player2_id,ut.player3_id,ut.player4_id,ut.player5_id,ut.player6_id,ut.player7_id,ut.player8_id,ut.player9_id,ut.player10_id,ut.player11_id  from user_teams ut  join contest_entries ce  on ce.uteam_id=ut.uteam_id  where contest_id=? ',[contest_id]
    ,  (err, results) => {
      if (err) {
        return res.status(500).send("error while fetching teams" + err.message)
      }
      if (results.length == 0) {
        return res.status(401).send("contest is empty")
      }
      return res.status(200).send(results);

    })
})
app.get('/user/matches/show_teams/players',(req,res)=>{
  console.log("I am in show_teams components")
  const player_ids=req.query.ids;
  const players=Array.isArray(player_ids)?player_ids:[player_ids];
  connection.query('select * from players where player_id in (?)',[players],(err,result)=>{
    if(err){
      res.status(500).send("error while fetching player details")
    }
    if(!result){
      res.status(404).send('players not found')
    }
    if(result.length==11){
      res.status(200).send(result)
    }
  })
})
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  //console.log(username) perfectly working
  //console.log(password)

  const query = `select * from users where username='${username}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error while validating", error)
      res.status(500).json({ message: 'internal server error' })
    }
    if(results.length==0){
      res.status(404).json({message:'error while fetching user details'})
    }
    else {
      //console.log('OK') #drycoding


      if (results.length) {
        
        const IsvalidPassword = bcrypt.compareSync(password, results[0].password);
        if (IsvalidPassword) {



          res.status(200).json(results[0]);
          // const query='select user_id from users where username=`${username}`';
          console.log("login successful",results[0].username)

        }
        else {
          res.status(401).json({ message: 'invalid credentials' })


        }
      }
      else {
        res.status(404).json({ message: 'user notfound' })
        const session = req.sessionID;
        console.log("on invalid username" + session)

      }
    }

  })
})
app.get('/user/matches/contests/:match_id', (req, res) => {
  const match_id = req.params.match_id;
  console.log("match_id :"+match_id);
  const query = `SELECT contest_id,contest_name,total_spots,spots_filled,winning_amount,entry_fee from contests where match_id='${match_id}'`
  connection.query(query, (error, result) => {
    if (error) {
      console.error('error while fetching data:', error)
      res.status(500).send('internal server error')
    }
    else {
      console.log(result)
      res.status(200).json(result)

    }

  })

})
app.post('/user/matches/mycontests/', (req, res) => {
  const user_id = req.body.user_id;
  const match_id = req.body.match_id;
  console.log("Iam in mycontests block");
  console.log(user_id + " : " + match_id);
  
  connection.query(
    'SELECT contest_id FROM contest_entries ce JOIN user_teams ut ON ce.uteam_id = ut.uteam_id WHERE user_id = ? AND match_id = ?',
    [user_id, match_id],
    (err, rows) => {
      if (err) {
        console.error('Error while fetching contests of user:', err);
        return res.status(500).send("Error while fetching contests of user");
      }
      if (rows.length === 0) {
        console.log("No contests found for user:", user_id, "and match:", match_id);
        return res.status(200).send([]);
      }
      console.log(rows.length);
      const contestIds = rows.map(contest => contest.contest_id);
      connection.query(
        'SELECT * FROM contests WHERE contest_id IN (?)',
        [contestIds],
        (err, contests) => {
          if (err) {
            console.error('Error while fetching contests:', err);
            return res.status(500).send('Error while fetching contests');
          }
          console.log(contests.length + " it is contests length");
          console.log("Response sent successfully");
          return res.status(200).send(contests);
        }
      );
    }
  );
});





// Close MySQL connection when the server is stopped
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
