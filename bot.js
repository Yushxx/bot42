import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const token = process.env.BOT_TOKEN; // 🔑 Mets ton token dans un fichier .env
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Bot démarré et en écoute...');

// Gestion des erreurs de polling
bot.on('polling_error', (error) => {
    console.error('❌ Erreur de connexion à Telegram :', error.message);
});

// Fonction pour ajouter une réaction
async function addReaction(chatId, messageId, emoji) {
    try {
        await bot.request('setMessageReaction', {
            chat_id: chatId,
            message_id: messageId,
            reaction: [{ type: 'emoji', emoji: emoji }],
        });
        console.log(`✅ Réaction ${emoji} ajoutée !`);
    } catch (err) {
        console.error('❌ Erreur lors de l’ajout de la réaction :', err.message);
    }
}

// Réagir aux messages dans les groupes/privés
bot.on('message', async (msg) => {
    await addReaction(msg.chat.id, msg.message_id, '👍'); // Emoji 👍 ajouté
});

// Réagir aux messages dans les canaux
bot.on('channel_post', async (msg) => {
    await addReaction(msg.chat.id, msg.message_id, '🔥'); // Emoji 🔥 ajouté
});
