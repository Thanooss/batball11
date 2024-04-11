
    const mysql = require('mysql');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Stoner@69',
  database: 'world',
});

// Sample array of objects
// let players=[{name:"Ms Dhoni",credits:8,team_id:1,src:"dhoni.jpg",role:"WK",Isselected:false,currentpoints:0},
//     {name:"faf duplesis",credits:9,team_id:3,src:"faf.jpg",role:"BAT",Isselected:false,currentpoints:0},
//     {name:"Virat Kohli",credits:9.5,team_id:3,src:"virat.jpg",role:"BAT",Isselected:false,currentpoints:0},
//      {name:"Glen Maxwell",credits:9.5,team_id:3,src:"maxwell.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"Ravindra Jadeja",credits:9.5,team_id:1,src:"jadeja.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"Dinesh Karthik",credits:7,team_id:3,src:"dk.jpg",role:"WK",Isselected:false,currentpoints:0},
//      {name:"Mohammad Siraj",credits:8.5,team_id:3,src:"siraj.jpg",role:"BOWL",Isselected:false,currentpoints:0},
//      {name:"Devon Conway",credits:8.5,team_id:1,src:"conway.jpg",role:"WK",Isselected:false,currentpoints:0},
//      {name:"W Hasaranga",credits:10,team_id:3,src:"hasaranga.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"Mooen Ali",credits:8.5,team_id:1,src:"mooen.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"M Pathirana",credits:8.5,team_id:1,src:"pathirana.jpg",role:"BOWL",Isselected:false,currentpoints:0},
//      {name:"Deepak Chahar",credits:8,team_id:1,src:"deepak.jpg",role:"BOWL",Isselected:false,currentpoints:0},
//      {name:"Shivam Dube",credits:8,team_id:1,src:"dube.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"David willey",credits:8.5,team_id:3,src:"willey.jpg",role:"AR",Isselected:false,currentpoints:0},
//      {name:"Ruturaj Gaikwad",credits:9,team_id:1,src:"ruturaj.jpg",role:"BAT",Isselected:false,currentpoints:0},
//      {name:"Kyle Jameison",credits:7.5,team_id:1,src:"jamieson.jpg",role:"BOWL",Isselected:false,currentpoints:0},
//      {name:"Ajinkhya Rahane",credits:9,team_id:1,src:"rahane.jpg",role:"BAT",Isselected:false,currentpoints:0},
//      {name:"Harshal Patel",credits:8.5,team_id:3,src:"harshal.jpg",role:"BOWL",Isselected:false,currentpoints:0},
//      {name:"Michael Bracewell",credits:9,team_id:3,src:"bracewell.jpg",role:"AR",Isselected:false,currentpoints:0},
//     ]

// Open the MySQL connection

// let players=[{name:"Aiden Markram",credits:9.5,team_id:4,src:"markram.jpg",role:"AR",Isselected:false,currentpoints:0},{name:"Travis Head",credits:9,team_id:4,src:"head.jpg",role:"AR",Isselected:false,currentpoints:0},
// {name:"pat Cummins",credits:9,team_id:4,src:"cummins.jpg",role:"BOWL",Isselected:false,currentpoints:0},{name:"Marco jansen",credits:9.5,team_id:4,src:"jansen.jpg",role:"AR",Isselected:false,currentpoints:0}
// ,{name:"henrich klassen",credits:9.5,team_id:4,src:"klassen.jpg",role:"WK",Isselected:false,currentpoints:0}
// ,{name:"bhuvneshwar kumar",credits:9,team_id:4,src:"bhuvi.jpg",role:"BOWL",Isselected:false,currentpoints:0}]
let players=[{name:"hardik pandya",credits:10,team_id:9,src:"hardik.jpg",role:"AR",Isselected:false,currentpoints:0},
{name:"rashid khan",credits:10,team_id:9,src:"rashid.jpg",role:"AR",Isselected:false,currentpoints:0},
{name:"shubman gill",credits:10,team_id:9,src:"gill.jpg",role:"BAT",Isselected:false,currentpoints:0},
{name:"sai sudharshan",credits:8.5,team_id:9,src:"sai.jpg",role:"BAT",Isselected:false,currentpoints:0},
{name:"abhinav manohar",credits:8,team_id:9,src:"abhinav.jpg",role:"BAT",Isselected:false,currentpoints:0},]
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  // Loop through the array and insert data into the table
  players.forEach((item) => {
    const { name,credits,team_id,src,role,Isselected,currentpoints } = item;
    const sql = `INSERT INTO players (name,credits,team_id,src,role,Isselected,currentpoints) VALUES ('${name}',${credits},${team_id},'${src}','${role}',${Isselected},${currentpoints})`;
      connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return;
      }

      console.log(`'Inserted:' ${result.affectedRows} 'row(s)'`);
    });
  });

  // Close the MySQL connection after all inserts are done
  connection.end();
});
