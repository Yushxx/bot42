import TelegramBot from 'node-telegram-bot-api';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Ton token de bot Telegram (remplace avec ton vrai token)
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// L'URL de l'API Telegram pour envoyer des requêtes
const apiUrl = `https://api.telegram.org/bot${token}/`;

// Fonction pour appeler l'API Telegram
async function callApi(action, body) {
    const response = await fetch(apiUrl + action, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error(`Telegram API request failed: ${action}`, data);
        throw new Error('Telegram API request failed: ' + action);
    }
}

// Fonction pour ajouter une réaction (emoji) à un message
async function setMessageReaction(chatId, messageId, emoji) {
    try {
        await callApi('setMessageReaction', {
            chat_id: chatId,
            message_id: messageId,
            reaction: [{
                type: 'emoji',
                emoji: emoji,
            }],
            is_big: true, // Optionnel, pour une réaction de grande taille
        });
        console.log('Réaction ajoutée à :', messageId);
    } catch (err) {
        console.error('Erreur dans setMessageReaction:', err.message);
    }
}

// Fonction pour envoyer un message avec des réactions (emoji) aléatoires
async function sendMessageWithRandomReaction(chatId, messageId, emojiList) {
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
    await setMessageReaction(chatId, messageId, randomEmoji);
}

// Gestion des erreurs de polling
bot.on('polling_error', (error) => {
    console.error('Erreur de connexion à Telegram :', error.message);
});

// Réagir aux messages dans les groupes/privés
bot.on('message', async (msg) => {
    const emojiList = ['👍', '😊', '🎉', '🔥', '💥']; // Liste d'emojis à choisir au hasard
    const { chat, message_id } = msg;

    try {
        // On ajoute une réaction si ce n'est pas un message de type 'command' (comme '/start' par exemple)
        if (!msg.text || !msg.text.startsWith('/')) {
            await sendMessageWithRandomReaction(chat.id, message_id, emojiList);
        }
    } catch (err) {
        console.error('Erreur dans le traitement du message :', err.message);
    }
});

// Réagir aux messages dans les canaux
bot.on('channel_post', async (msg) => {
    const emojiList = ['🚀', '💥', '✨', '🌟']; // Liste d'emojis pour les canaux
    const { chat, message_id } = msg;

    try {
        // Ajouter une réaction dans le canal
        await sendMessageWithRandomReaction(chat.id, message_id, emojiList);
    } catch (err) {
        console.error('Erreur dans le traitement du channel_post :', err.message);
    }
});

// Commande de démarrage du bot
bot.onText(/\/start/, async (msg) => {
    const { chat } = msg;
    const welcomeMessage = 'Bienvenue ! Je suis ton bot pour ajouter des réactions emoji sur les messages ! 🎉';
    await bot.sendMessage(chat.id, welcomeMessage);
});

console.log('Bot démarré et prêt à ajouter des réactions!');
