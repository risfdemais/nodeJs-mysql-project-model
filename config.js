// config.js
module.exports = {
    jwtSecret: "PUT-ANY-TEXT-HERE",
    jwtSession: {session: false},
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || '',
    database: process.env.DATABASE || 'BD'
    };