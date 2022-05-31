require('dotenv').config();

const {
  Client,
  Intents
} = require('discord.js');
const client = new Client({
  intents: [
    "GUILD_MESSAGES",
    "GUILDS"
  ]
});

const { Console } = require("console");
const axios = require('axios');
const apiUrl = process.env.API_URL;

const fs = require('fs');
const guild = require("./modules/guild");


client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
  if (process.env.DEBUG_MESSAGES === true) {
    logger(message);
  }

  if (message.content.startsWith(process.env.COMMAND_INDICATOR)) {
    commandInput(message);
  }


  async function commandInput(message){

    const guild = require('./modules/guild');
    const guildValidation = await guild.validation(message.guild);
    if(!guildValidation)
      return;

  }

  function logger(message) {

    // current date
    let date_ob = new Date();

    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // set log file
    let logFile = "./logs/requests/" + year + "-" + month + "-" + date + " " + hours + "-" + minutes + ".log";



    // make a new logger
    const debugLogger = new Console({
      stdout: fs.createWriteStream(logFile, {
        flags: 'a+'
      }),
      stderr: fs.createWriteStream("./logs/errors.log", {
        flags: 'a+'
      }),
    });

    // log
    debugLogger.log("Nova Requisição \n");
    debugLogger.log(message);
    debugLogger.log("\n\n\n");

  }
});