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

// Réagir aux messages dans les groupes/privés
bot.on('message', async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, '✅ Réaction ajoutée !');
        console.log('👍 Réaction ajoutée en privé/groupe !');
    } catch (err) {
        console.error('❌ Erreur dans message:', err.message);
    }
});

// Réagir aux messages dans les canaux
bot.on('channel_post', async (msg) => {
    try {
        await bot.sendMessage(msg.chat.id, '🚀 Réaction ajoutée dans le canal !');
        console.log('🚀 Réaction ajoutée dans le canal !');
    } catch (err) {
        console.error('❌ Erreur dans channel_post:', err.message);
    }
});
