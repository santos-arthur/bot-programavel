const db = require("./database");

async function search(option){
    const conn = await db.connect();
    const sql = 'SELECT cfg.id, cfg.option, cfg.value FROM configurations cfg WHERE cfg.option = ?;'
    const [[rows]] = await conn.query(sql, option);
    return rows;
}

module.exports = {search}