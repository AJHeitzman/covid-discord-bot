/*-----------------------------------------------------------------------

LINKS: 
    * https://www.howtogeek.com/364225/how-to-make-your-own-discord-bot/
    * https://discord.js.org/#/docs/main/stable/class/Presence

NOTES: 
    * Run nodemon --inspect index.js

-----------------------------------------------------------------------*/

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 
    let user = client.users.fetch("95978871349850112");
    let statusUser = client.user.presence.status;
    console.log(statusUser);

 });

client.on('presenceUpdate',(oldPresence,newPresence) => {
    let member = newPresence.member;
    // User id of the user you're tracking status.
    if (member.id === '95978871349850112') {
        if (oldPresence.status !== newPresence.status) {
            // Your specific channel to send a message in.
            let channel = member.guild.channels.cache.get('353406837476818954');
            // You can also use member.guild.channels.resolve('<channelId>');

            let text = "";

            if (newPresence.status === "online") {
                text = "Our special member is online!";
            } else if (newPresence.status === "offline") {
                text = "Oh no! Our special member is offline.";
            }
            // etc...

            channel.send(text);
        }
    } 
});

client.login(config.discord_token);
