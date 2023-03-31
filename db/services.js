const db = require("./db");
const { bot } = require("../index");

const addUser = (user, chatId) => {
  db.query(
    `INSERT INTO users (email, password, chatId) VALUES ('${user.email}', '${user.password}', ${chatId})`,
    function (err, result) {
      if (err) {
        console.error(err.message);
        bot.sendMessage(
          chatId,
          "Sorry, there was an error processing your registration. Please try again later."
        );
      } else {
        console.log(result);
        bot.sendMessage(chatId, "You are registered!", {
          reply_markup: {
            keyboard: [["Bitcoin"]],
            // bot.sendMessage(chatId, results[0].name);
          },
        });
      }
    }
  );
};

module.exports = { addUser, loggerBot };
