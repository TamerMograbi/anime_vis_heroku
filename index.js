const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
// IMPORTANT NOTE: THIS VERSION INCLUDES A3USER,A3DB,PASSWORD AS USER,DATABASE NAME,.password RESPECTIVELY
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'a3user',
  host: 'localhost',
  database: 'a3db',
  password: 'password',
  port: 5432,
})

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
        `SELECT animes.anime_id,title,numberofViews,episodes,rank
        FROM
        (SELECT anime_id, COUNT(*) as numberOfViews
        FROM animeusers2M
        WHERE my_status=2
        GROUP BY anime_id) as foo JOIN animes ON animes.anime_id=foo.anime_id
        WHERE ${movieTvQ} AND rank >= ${request.query.min_pop} AND rank <=${request.query.max_pop} ORDER BY rank`;

    pool.query(queryStr)
        .then( results => {      
            response.json(results.rows)
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})