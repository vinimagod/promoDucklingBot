const { SlashCommandBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Função reutilizável para buscar e enviar jogos gratuitos
async function fetchFreeGames(channelOrInteraction) {
    const url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1,25&upperPrice=0';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
            await channelOrInteraction.reply
                ? channelOrInteraction.editReply("Nenhum jogo gratuito encontrado no momento.")
                : channelOrInteraction.send("Nenhum jogo gratuito encontrado no momento.");
            return;
        }

        const deals = data.map(game => {
            const storeName = game.storeID === '1' ? 'Steam' : 'Epic Games';
            return `🎮 **${game.title}**\n🛒 Loja: ${storeName}\n💰 Preço atual: Gratuito! (Preço normal: ${game.normalPrice})\n`;
        }).join("\n");

        await channelOrInteraction.reply
            ? channelOrInteraction.editReply(deals)
            : channelOrInteraction.send(deals);

    } catch (error) {
        console.error(`Erro ao buscar dados: ${error.message}`);
        await channelOrInteraction.reply
            ? channelOrInteraction.editReply("Ocorreu um erro ao buscar os jogos gratuitos. Tente novamente mais tarde.")
            : channelOrInteraction.send("Ocorreu um erro ao buscar os jogos gratuitos. Tente novamente mais tarde.");
    }
}

// Exporta a função do slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName("freegames")
        .setDescription("Mostra os jogos grátis atualmente na STEAM e EPIC GAMES"),

    async execute(interaction) {
        await interaction.deferReply();
        await fetchFreeGames(interaction);
    },

    // Exporta a função para uso no cron job
    fetchFreeGames
};