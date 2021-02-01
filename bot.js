require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { getIP, setIP } = require('./ip');

const COMMAND_REGEX = /\/tell ip/;

const run = async () => {
    const ID = process.env.TELEGRAM_ID;
    const TOKEN = process.env.TELEGRAM_TOKEN;
    let ip = await getIP();

    const bot = new TelegramBot(TOKEN, { polling: true });

    bot.sendMessage(ID, '開始しています…').then(() => {
        bot.sendMessage(ID, ip);
    });

    setInterval(async () => {
        const updatedIP = await getIP();
        if (ip !== updatedIP) {
            bot.sendMessage(ID, 'IP changed!');
            bot.sendMessage(ID, updatedIP);
            ip = updatedIP;
        }
    }, 1000 * 60);

    setInterval(async () => {
        await setIP();
    }, 1000 * 10);

    bot.onText(COMMAND_REGEX, (msg) => {
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, ip);
    });

    bot.on('message', (msg) => {
        if (COMMAND_REGEX.test(msg.text)) {
            return;
        }
        if (/\/start/.test(msg.text)) {
            return;
        }
        const chatId = msg.chat.id;

        bot.sendMessage(chatId, '意味が全然分かりません。');
    });
};

run();
