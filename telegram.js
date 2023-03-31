const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(process.env.BOT_KEY, { polling: true });

module.exports = bot;
