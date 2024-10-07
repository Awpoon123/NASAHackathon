const { Pool } = require('pg'); // Use the PostgreSQL client
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

async function registerUser(location, measurement) {
    const query = 'INSERT INTO observations (latitude, longitude, measurement) VALUES ($1, $2, $3)';
    const values = [location.lat, location.lng, measurement];

    await pool.query(query, values);
}

module.exports = { registerUser };