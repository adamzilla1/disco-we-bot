var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                botSendMsg('pong!', channelID);
                break;
            case 'weather':
                //TODO: format the input properly, -> "vancouver, canada" doesn't work properly, but "vancouver, ca" does
                if (args[0] != null) {
                    var city, state;
                    var myurl;
                    city = args[0];
                    args = args.splice(1);

                    if (city.endsWith(',')) {
                        city = city.substring(0, city.length - 1);
                    }

                    state = args[0];
                    args = args.splice(1);

                    myurl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&appid=' + auth.weatherToken;

                    request(myurl, { json: true }, function (err, res, body) {
                        console.log(body);
                        if (body.cod === 200) {
                            let message = '-------------\nCITY: ' + city + ' ' + 'STATE: ' + state + '\n' + 'Current: ' + body.main.temp + ' Kelvin\n' + body.weather["0"].description + '\n---------------------------'
                            botSendMsg(message, channelID);
                        }
                    });

                }

                break;
            //TODO: add this functionality
            case 'forecast':
                break;
            case 'embed':
                // const embed = new Discord.RichEmbed()
                //     .setImage("http://www.hockeydb.com/ihdb/photos/brock-boeser-2019-39.jpg");
                // botSendMsg(embed, channelID);
                bot.sendMessage({
                    to: channelID,
                    embed: {
                        url: "http://www.hockeydb.com/ihdb/photos/brock-boeser-2019-39.jpg"
                    }
                });
                break;
        }
    }
});

function botSendMsg(msg, chanId) {
    bot.sendMessage({
        to: chanId,
        message: msg
    });
}