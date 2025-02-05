const TelegramBot = require('node-telegram-bot-api');

// Remplace 'TON_TOKEN_BOT' par le token de ton bot
const token = '7716709396:AAH4CpyfwN-EtdzFqpIbKolZz8OwiEla6qw';

// Initialise le bot
const bot = new TelegramBot(token, { polling: true });

console.log('Bot démarré...');

// Réagir aux messages dans les groupes, en privé ou dans les canaux
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    console.log('Message reçu dans un groupe ou en privé :', msg.text);

    // Réagir avec un émoji
    bot.setMessageReaction(chatId, messageId, [{ type: 'emoji', emoji: '👍' }])
        .then(() => console.log('Réaction ajoutée !'))
        .catch((err) => console.error('Erreur :', err));
});

// Réagir aux messages dans les canaux
bot.on('channel_post', (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;

    console.log('Message reçu dans un canal :', msg.text);

    // Réagir avec un émoji
    bot.setMessageReaction(chatId, messageId, [{ type: 'emoji', emoji: '🚀' }])
        .then(() => console.log('Réaction ajoutée dans le canal !'))
        .catch((err) => console.error('Erreur :', err));
});
