const db = require("./db");
const bot = require("../telegram");

const registrationAudit = (chatId, callBack) => {
  db.query(
    `SELECT * FROM users WHERE chatId = ${chatId} `,
    function (err, result) {
      if (result.length > 0) {
        bot.sendMessage(chatId, "User is already registered", {
          reply_markup: {
            keyboard: [["BTC", "ETH"]],
          },
        });
      } else {
        callBack();
      }
    }
  );
};

module.exports = { registrationAudit };
