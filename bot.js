const TelegramBot = require('node-telegram-bot-api');

const token = '7716709396:AAH4CpyfwN-EtdzFqpIbKolZz8OwiEla6qw'; // <-- Remplace par ton token
const bot = new TelegramBot(token, { polling: true });

// Gestion des erreurs de polling
bot.on('polling_error', (error) => {
    console.error('Erreur de connexion à Telegram :', error.message);
});

// Réagir aux messages dans les groupes/privés
bot.on('message', async (msg) => {
    try {
        await bot.setMessageReaction(msg.chat.id, msg.message_id, [{ type: 'emoji', emoji: '👍' }]);
        console.log('Réaction ajoutée en privé/groupe !');
    } catch (err) {
        console.error('Erreur dans message:', err.message);
    }
});

// Réagir aux messages dans les canaux
bot.on('channel_post', async (msg) => {
    try {
        await bot.setMessageReaction(msg.chat.id, msg.message_id, [{ type: 'emoji', emoji: '🚀' }]);
        console.log('Réaction ajoutée dans le canal !');
    } catch (err) {
        console.error('Erreur dans channel_post:', err.message);
    }
});

console.log('Bot démarré !');
