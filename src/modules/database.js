async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host:       process.env.DATABASE_HOST,
        user:       process.env.DATABASE_USER,
        password:   process.env.DATABASE_PASS,
        database:   process.env.DATABASE_NAME
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = {connect}