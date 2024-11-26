const {SlashCommandBuilder} = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("github")
        .setDescription("Envia o Repositório do GitHub desse projeto"),

    async execute(interaction) {
        await interaction.reply("https://github.com/vinimagod/promoDucklingBot/blob/main/README.md")
    }
}