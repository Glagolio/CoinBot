const db = require("./db");
const bot = require("../telegram");

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
        bot.sendMessage(chatId, "You are registered!", {
          reply_markup: {
            keyboard: [["BTC", "ETH"]],
          },
        });
      }
    }
  );
};

module.exports = { addUser };
