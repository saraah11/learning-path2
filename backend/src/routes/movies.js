import express from 'express';
import { pool } from '../app.js';

const router = express.Router();

// Vulnerable route to demonstrate parameter pollution
router.get('/', async (req, res) => {
    try {
        // Extract query parameters
        const { sort, ratings } = req.query;
    
        // Default query
        let query = 'SELECT * FROM MOVIES';
        let queryParams = [];
    
       // allowing multipe parmeters from whitelist
        // Filtering by ratings (allow multiple ratings using IN clause)
        if (ratings) {
          // If ratings is an array (multiple values), use an IN clause
          if (Array.isArray(ratings)) {
            queryParams.push(...ratings);
            const placeholders = ratings.map((_, i) => `$${queryParams.length - ratings.length + i + 1}`).join(", ");
            query += ` WHERE ratings IN (${placeholders})`;
          } else {
            // If it's a single value, filter by it directly
            queryParams.push(ratings);
            query += ` WHERE ratings = $${queryParams.length}`;
          }
        }


      // Sorting
      if (sort) {
        // Dangerous - Directly concatenating unsanitized sort column
        query += ` ORDER BY ${sort}`;
      }
  
      // Fetching data from database
      const data = await pool.query(query, queryParams);
      res.json(data.rows);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  });
  
export default router;