const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
            const message = "Nenhum jogo gratuito encontrado no momento.";
            await sendReply(channelOrInteraction, message);
            return;
        }

        // Mapeia cada jogo para criar um embed
        const embeds = data.map(game => {
            const storeName = game.storeID === '1' ? 'Steam' : 'Epic Games';

            return new EmbedBuilder()
                .setColor(0x00FF00)  // Define a cor verde
                .setTitle(game.title)  // Nome do jogo
                .setURL(`https://store.steampowered.com/app/${game.steamAppID || ''}`)  // Link para o jogo (caso exista o steamAppID)
                .setDescription(`🛒 **Loja:** ${storeName}\n💰**Preço atual:**${game.salePrice}\n💰**Preço normal:**${game.normalPrice}`)
                .setImage(game.thumb);  // Adiciona a imagem do jogo
        });
        // Menciona o usuário que usou o comando
        const userMention = channelOrInteraction.user ? `<@${channelOrInteraction.user.id}>` : '';
        const message = `Aqui estão os jogos gratuitos da semana, ${userMention}:`;

        await sendReply(channelOrInteraction, { content: message, embeds });

    } catch (error) {
        console.error(`Erro ao buscar dados: ${error.message}`);
        const message = "Ocorreu um erro ao buscar os jogos gratuitos. Tente novamente mais tarde.";
        await sendReply(channelOrInteraction, message);
    }
}

// Função auxiliar para enviar respostas no canal ou interação
async function sendReply(channelOrInteraction, content) {
    if (channelOrInteraction.reply) {
        await channelOrInteraction.editReply(content);
    } else {
        await channelOrInteraction.send(content);
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
