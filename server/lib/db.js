const pg = require('pg');

// Create a config
var config = {
    user: 'postgres',
    database: 'habit',
    password: 'fritzish',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

// Initialize a connection pool using our config var
const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});

// export the method for passing queries to the pool
module.exports.query = function(text, values, callback) {
    return pool.query(text, values, callback);
};

// export the method for checking out a client for multiple
// operations, such as a transaction
module.exports.connect = function(callback) {
    return pool.connect(callback);
}