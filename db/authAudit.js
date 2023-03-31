const db = require("./db");
const bot = require("../telegram");

const authAudit = (chatId, callBack) => {
  db.query(
    `SELECT * FROM users WHERE chatId = ${chatId} `,
    function (err, result) {
      if (result.length === 0) {
        bot.sendMessage(chatId, "Not authenticated.", {
          reply_markup: {
            keyboard: [["Registration"]],
          },
        });
        return;
      } else {
        callBack();
        return;
      }
    }
  );
};

module.exports = { authAudit };
