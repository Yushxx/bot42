const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = '7716709396:AAH4CpyfwN-EtdzFqpIbKolZz8OwiEla6qw'; // Remplace par ton token
const bot = new TelegramBot(token, { polling: true });

const API_URL = `https://api.telegram.org/bot${token}/setMessageReaction`;

// Gestion des erreurs de polling
bot.on('polling_error', (error) => {
    console.error('Erreur de connexion à Telegram :', error.message);
});

// Fonction pour envoyer une réaction
async function addReaction(chatId, messageId, emoji) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                message_id: messageId,
                reaction: [{ type: 'emoji', emoji: emoji }],
                is_big: true
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            console.error(`Erreur API Telegram : ${data.description}`);
        } else {
            console.log(`✅ Réaction ajoutée : ${emoji}`);
        }
    } catch (err) {
        console.error('Erreur lors de l’envoi de la réaction :', err.message);
    }
}

// Réagir aux messages dans les groupes et privés
bot.on('message', async (msg) => {
    await addReaction(msg.chat.id, msg.message_id, '👍');
});

// Réagir aux messages dans les canaux
bot.on('channel_post', async (msg) => {
    await addReaction(msg.chat.id, msg.message_id, '🔥');
});

console.log('🤖 Bot démarré et en écoute...');
