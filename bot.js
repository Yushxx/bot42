import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const EMOJI = process.env.EMOJI;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/`;

async function callTelegramAPI(method, body) {
    const response = await fetch(API_URL + method, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    
    if (!data.ok) {
        console.error(`Erreur API Telegram : ${data.description}`);
    }
    return data;
}

async function setMessageReaction(chatId, messageId) {
    const body = {
        chat_id: chatId,
        message_id: messageId,
        reaction: [{ type: 'emoji', emoji: EMOJI }],
        is_big: true
    };

    await callTelegramAPI('setMessageReaction', body);
}

async function startBot() {
    let offset = 0;

    console.log('🤖 Bot en écoute...');

    while (true) {
        try {
            const updates = await callTelegramAPI('getUpdates', { offset, timeout: 30 });

            for (const update of updates.result) {
                if (update.channel_post) {
                    const { chat, message_id } = update.channel_post;
                    console.log(`📩 Nouveau message détecté dans ${chat.title}`);

                    await setMessageReaction(chat.id, message_id);
                    console.log('✅ Réaction ajoutée !');

                    offset = update.update_id + 1;
                }
            }
        } catch (error) {
            console.error('Erreur dans la boucle du bot:', error);
        }
    }
}

startBot();
