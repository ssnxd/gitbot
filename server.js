const { Client, Intents, MessageEmbed } = require('discord.js');
const { createIssue } = require('./integration/github')
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready 🚀!');
});

client.on('interactionCreate', async (interaction) => {
	if(!interaction.isCommand()) return;

	const { commandName } = interaction
	const repo = interaction.options.getString("repo")
	const title = interaction.options.getString("title")
	const description = interaction.options.getString("description")

	if(commandName === 'issue-new') {
		const { success, data } = await createIssue(repo, title, description)
		if(success) {
			const { title, url, description, id  } = data

			const successMessage = new MessageEmbed()
				.setColor('GREEN')
				.setTitle(`Added issue #${id}: ${title}`)
				.setURL(url)
				.setDescription(description)

			interaction.channel.send({
				embeds: [successMessage],
				ephemeral: true
			})

			interaction.reply('Successfully added 🚀')

		} else {

			const failedMessage = new MessageEmbed()
				.setColor('RED')
				.setTitle(`Failed to add issue`)

			await interaction.reply({
				embeds: [failedMessage],
				ephemeral: true
			})
		}
	}

});

// Login to Discord with your client's token
client.login(token);
