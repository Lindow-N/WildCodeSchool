const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  port: 5432,
});

const getArgonautes = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM argonautes ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createArgonautes = (body) => {
    return new Promise(function(resolve, reject) {
      const { name} = body
      pool.query('INSERT INTO argonautes (name) VALUES ($1) RETURNING *', [name], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new argonautes has been added added`)
      })
    })
  }

  const deleteArgonautes = (id) => {
    return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM argonautes WHERE id = $1`, [id], (error, results) => {
    if (error) {
    reject(error)
    }
    resolve(`argonautes deleted with ID: ${id}`)
    })
    })
    }
  
  module.exports = {
    getArgonautes,
    createArgonautes,
    deleteArgonautes,
  }