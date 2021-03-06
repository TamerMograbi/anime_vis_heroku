const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//const port = 8080
// IMPORTANT NOTE: THIS VERSION INCLUDES A3USER,A3DB,PASSWORD AS USER,DATABASE NAME,.password RESPECTIVELY
const { Pool } = require('pg')
require('dotenv').config()
const env = process.env

const pool = new Pool({
  connectionString: env.DATABASE_URL
})

/*const pool = new Pool({
  user: 'a3user',
  host: 'localhost',
  database: 'a3db',
  password: 'password',
  port: 5432,
})*/



app.use(express.static('public'))




app.get('/data', (request, response) => {
    //console.log(`SELECT * FROM matView WHERE popularity >= ${request.query.min_pop}`);
    var movieTvQ = " ";
    var moviesChecked = request.query.movie_checked == 'true';
    var tvChecked = request.query.tv_checked == 'true';
    
    if(moviesChecked && tvChecked){
        movieTvQ = "episodes > 0";
    } else if(moviesChecked && !tvChecked){
        movieTvQ = "episodes = 1";
    } else if(!moviesChecked && tvChecked){
        movieTvQ = "episodes > 1";
    } else{
        movieTvQ = "episodes = -1";
    }
    /*pool.query(`SELECT * FROM matView3 WHERE ${movieTvQ} AND popularity >= ${request.query.min_pop} AND popularity <=${request.query.max_pop} ORDER BY popularity`)
        .then( results => {      
            response.json(results.rows)
        })
    */
    var queryStr = 
        `SELECT anime_id,title,numberofViews,episodes,rank,aired,studio
        FROM animes 
        WHERE ${movieTvQ} AND rank >= ${request.query.min_pop} AND rank <=${request.query.max_pop}
        ORDER BY rank`;

    pool.query(queryStr)
        .then( results => {      
            response.json(results.rows)
        })
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}.`)
})