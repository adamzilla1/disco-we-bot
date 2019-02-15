var Discord = require('discord.js');
var logger = require('winston');
var auth = require('./auth.json');
var config = require('./config.json');
var request = require('request');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token);

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ' + bot.user.tag);
    // logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', async msg => {
    if (msg.author.bot) return;
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (msg.content.indexOf(config.prefix) !== 0) return;

    var args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();
    // args.forEach(e => {
    //     e = trimChar(',', e);

    // });
    for (let i = 0; i < args.length - 1; i++) {
        args[i] = trimChar(',', args[i]);
    }

    msg.channel.send('args: ' + args);
    msg.channel.send('cmd: ' + cmd);
    // args = args.splice(1);
    // switch (cmd) {
    //     // !ping
    //     case 'ping':
    //         message.reply('pong!');
    //         // botSendMsg('pong!', channelID);
    //         break;
    //     case 'weather':
    //         //TODO: format the input properly, -> "vancouver, canada" doesn't work properly, but "vancouver, ca" does
    //         if (args[0] != null) {
    //             var city, state;
    //             var myurl;
    //             city = args[0];
    //             args = args.splice(1);

    //             if (city.endsWith(',')) {
    //                 city = city.substring(0, city.length - 1);
    //             }

    //             state = args[0];
    //             args = args.splice(1);

    //             myurl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&appid=' + auth.weatherToken;

    //             request(myurl, { json: true }, function (err, res, body) {
    //                 console.log(body);
    //                 if (body.cod === 200) {
    //                     let message = '-------------\nCITY: ' + city + ' ' + 'STATE: ' + state + '\n' + 'Current: ' + body.main.temp + ' Kelvin\n' + body.weather["0"].description + '\n---------------------------'
    //                     botSendMsg(message, channelID);
    //                 }
    //             });

    //         }

    //         break;
    //     //TODO: add this functionality
    //     case 'forecast':
    //         break;
    //     case 'embed':
    //         // const embed = new Discord.RichEmbed()
    //         //     .setImage("http://www.hockeydb.com/ihdb/photos/brock-boeser-2019-39.jpg");
    //         // botSendMsg(embed, channelID);
    //         bot.sendMessage({
    //             to: channelID,
    //             embed: {
    //                 url: "http://www.hockeydb.com/ihdb/photos/brock-boeser-2019-39.jpg"
    //             }
    //         });
    //         break;
    // }
});

function trimChar(charToRemove, e) {
    console.log('working on: ' + e);
    while (e.charAt(0) === charToRemove) {
        e = e.substring(1);
    }

    while (e.charAt(e.length - 1) === charToRemove) {
        console.log(e.charAt(e.length - 1));
        e = e.substring(0, e.length - 1);
    }
    console.log('new e: ' + e);
    return e;
}