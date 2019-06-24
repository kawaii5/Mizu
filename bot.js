// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./auth.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Go with the flow...`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
	if (command === 'roles') {
		//const adminRoleId = "592581668796104705";
		if(message.member.roles.has(config.adminRoleId)) {
			try {
				await message.react('🇬🇧');
				await message.react('🇩🇪');
				await message.react('🇫🇷');
			} catch (error) {
				console.error('One of the emojis failed to react.');
			}
		} else {
			message.channel.send("You are not allowed to do that!");
		}
  }
  
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

// Unnecessary to call "role" again, you can continue using the old msg/reactions
client.on('raw', event => {
	const eventName = event.t;
	if(eventName === 'MESSAGE_REACTION_ADD') {
		if(event.d.message_id === config.reactMessageId) {
			var reactionChannel = client.channels.get(event.d.channel_id);
			if(reactionChannel.messages.has(event.d.message_id)) return;
			reactionChannel.fetchMessage(event.d.message_id)
				.then(msg => {
					var msgReaction = msg.reactions.get(event.d.emoji.name);
					var user = client.users.get(event.d.user_id);
					client.emit('messageReactionAdd', msgReaction, user);
				})
				.catch(err => console.log(err));
		}
	}
});

client.on('messageReactionAdd', (messageReaction, user) => {
	var guild = messageReaction.message.guild;
	// EN '%F0%9F%87%AC%F0%9F%87%A7'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'en');
	if(role && roleId === config.en) {
		var member = guild.members.find(member => member.id === user.id);
		if(member) {
			member.addRole(role.id);
		}
	}
	// DE '%F0%9F%87%A9%F0%9F%87%AA'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'de');
	if(role && roleId === config.de) {
		var member = guild.members.find(member => member.id === user.id);
		if(member) {
			member.addRole(role.id);
		}
	}
	// FR '%F0%9F%87%AB%F0%9F%87%B7'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'fr');
	if(role && roleId === config.fr) {
		var member = guild.members.find(member => member.id === user.id);
		if(member) {
			member.addRole(role.id);
		}
	}
});


client.on('messageReactionRemove', (messageReaction, user) => {
	var guild = messageReaction.message.guild;
	// EN '%F0%9F%87%AC%F0%9F%87%A7'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'en');
	if(role && roleId === config.en)
	{
		var member = guild.members.find(member => member.id === user.id);
		if(member)
		{
			member.removeRole(role.id);
		}
	}
	// DE '%F0%9F%87%A9%F0%9F%87%AA'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'de');
	if(role && roleId === config.de) {
		var member = guild.members.find(member => member.id === user.id);
		if(member) {
			member.removeRole(role.id);
		}
	}
	// FR '%F0%9F%87%AB%F0%9F%87%B7'
	var roleId = messageReaction.emoji.identifier;
	var role = guild.roles.find(role => role.name.toLowerCase() === 'fr');
	if(role && roleId === config.fr) {
		var member = guild.members.find(member => member.id === user.id);
		if(member) {
			member.removeRole(role.id);
		}
	}
});

client.login(config.token);