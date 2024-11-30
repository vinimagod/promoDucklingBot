const { Client, Events, GatewayIntentBits, Collection, TextChannel } = require('discord.js');
const cron = require('node-cron');

// dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env;

// Importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausentes`);
    }
}

// Log in no discord
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    // Agendamento semanal: sexta-feira às 8h
    cron.schedule('* * * * *', async () => {  // Ajuste do horário conforme necessário (utilizando o padrão do node-cron)  * 8 * * 5
        const channelId = '1108477729340395612';  // Substitua pelo ID do seu canal
        const channel = await client.channels.fetch(channelId);

        if (channel && channel instanceof TextChannel) {

            await channel.send('@everyone Confira os jogos gratuitos da semana!');
            // Importa a função diretamente do freegames.js
            const { fetchFreeGames } = require('./commands/freeGames');
            await fetchFreeGames(channel);
        }
    });
});

client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error("Comando não encontrado!");
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply("Houve um erro ao executar esse comando!");
    }
});