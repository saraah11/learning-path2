import express from 'express';
import { pool } from '../app.js';
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    // safe Query
    const safeQuery = `SELECT * FROM users WHERE username = $1 AND password = $2`;
    // and pass [username , password] to pool
    
    try {
      const result = await pool.query(safeQuery,[username, password]);
      if (result.rows.length > 0) {
        res.status(200).send("Login successfuly");
      } else {
        res.status(404).send('Invalid username or password');
      }
    } catch (error) {
      console.log('Internal Server Error', error);
    }
  });

export default router;