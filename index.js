/*-----------------------------------------------------------------------

LINKS: 
    * https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/
    * https://discord.js.org/#/docs/main/stable/class/Presence

NOTES: 
    * Run nodemon --inspect index.js

-----------------------------------------------------------------------*/

const Discord = require('discord.js');
const config = require('./config.json');
const fetch = require('node-fetch');
const client = new Discord.Client();

client.on('ready', async () => {
 console.log(`Logged in as ${client.user.tag}!`);
 
    let user = client.users.fetch(config.user_to_remind);
    let statusUser = client.user.presence.status;
    console.log(statusUser);

 });

client.on('presenceUpdate', async (oldPresence,newPresence) => {
    let member = newPresence.member;
    // User id of the user you're tracking status.
    if (member.id === config.user_to_remind) {
        if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get(config.discord_channel);
            // You can also use member.guild.channels.resolve('<channelId>');

            const stats = await fetch(config.covid_api).then(response => response.json());
            const deathCount = stats.data[0].region.cities[0].deaths

            let text = "";

            if (newPresence.status === "online") {
                text = "Welcome Back! Your county is up to " + deathCount + " COVID-19 deaths, make sure to use a mask when going out and practice social distancing.";
            } else if (newPresence.status === "offline") {
                text = "Oh no! Our special member is offline.";
            }
            // etc...

            channel.send(text);
        }
    } 
});

client.login(config.discord_token);