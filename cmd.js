const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("issue-new")
    .setDescription("Add new issue to github USAGE: repo title description")
    .addStringOption((option) =>
      option
        .setName("repo")
        .setDescription("The repo to create issue in")
        .setRequired(true)
        .addChoice("Web", "juiced-client")
        .addChoice("Backend", "juiced-backend")
        .addChoice("Admin", "juiced-admin")
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title for the issue")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Describe what's wrong")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
