var Discord = require('discord.js');
// Initialize Discord Bot
var bot = new Discord.Client();
bot.on('ready', function (evt) {
    console.log('I am ready!', evt);
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret