const db = require("./database");
const config = require("./config");

async function search(guild){
    const conn = await db.connect();
    const sql = 'SELECT id, discordGuildName, discordGuildId, available FROM guilds WHERE discordGuildId = ?;'
    const [[rows]] = await conn.query(sql, guild.id);
    return rows;
}

async function insert(guild){
    const conn = await db.connect();
    const sql = 'INSERT INTO guilds (discordGuildName, discordGuildId, available, created_at) VALUES (?, ?, 0, NOW());'
    return await conn.query(sql, [guild.name, guild.id]);
}

async function update(guild){
    const conn = await db.connect();
    const sql = 'UPDATE guilds SET discordGuildName = ?, updated_at = NOW() WHERE discordGuildId = ?;'
    return await conn.query(sql, [guild.name, guild.id]);
}

async function validation(guild){
    const guildInfos = await search(guild);
    if(typeof guildInfos === 'undefined' || guild.length === 0){
        const addNewGuilds = await config.search("autoAddUnknownsGuilds");
        if(addNewGuilds.value == 'true')
            await insert(guild);
    }else{
        if(guild.name !== guildInfos.discordGuildName)
            await update(guild);
        return guild.available;
    }
    return false;
}

module.exports = {validation}