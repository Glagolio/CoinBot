const { getData } = require("./getData");
const { getCurrentTime } = require("./getCurrentTime");
const bot = require("../telegram");

const coinMessage = (chatId) => {
  getData().then((res) => {
    const rate = res.rate.toFixed(2);
    const { month, day, year, minutes, hours } = getCurrentTime(res.time);
    bot.sendMessage(
      chatId,
      `<b>BITCOIN: ${rate}$</b> \n <pre>Last update: ${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${day} ${month} ${year}</pre>`,
      {
        parse_mode: "HTML",
      }
    );
  });
};

// Розилка винесена в окрему функцію, оскільки в цьому випадку я роблю 1 запит на API і розислаю усім результат.
const spamMessage = (result) => {
  getData().then((res) => {
    const rate = res.rate.toFixed(2);
    const { month, day, year, minutes, hours } = getCurrentTime(res.time);

    result.forEach((item) => {
      bot.sendMessage(
        item.chatId,
        `<b>BITCOIN: ${rate}$</b> \n <pre>Last update: ${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        } ${day} ${month} ${year}</pre>`,
        {
          parse_mode: "HTML",
        }
      );
    });
  });
};
module.exports = { coinMessage, spamMessage };
