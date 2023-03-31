const express = require("express");
const db = require("./db/db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const bot = require("./telegram");
const { coinMessage, spamMessage } = require("./services/messages");
const { authAudit } = require("./db/authAudit");
const { addUser } = require("./db/addUser");
const { registrationAudit } = require("./db/registrationAudit");
const { validateEmail, validatePassword } = require("./services/validation");

const app = express();
const PORT = process.env.PORT || 3040;
const users = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  authAudit(chatId, () => {
    bot.sendMessage(chatId, "Welcome back", {
      reply_markup: {
        keyboard: [["BTC", "ETH"]],
      },
    });
    return;
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.toString().toLowerCase().indexOf("registration") === 0) {
    registrationAudit(chatId, () => {
      if (!users[chatId]) {
        users[chatId] = {
          email: null,
          password: null,
        };
      }
      const user = users[chatId];
      if (!user.email) {
        bot.sendMessage(chatId, "Enter your email address");
        return;
      } else if (!user.password) {
        bot.sendMessage(chatId, "Enter password");
        return;
      }
      delete users[chatId];
      bot.sendMessage(chatId, "You are registered!");
      return;
    });
  }

  const user = users[chatId];
  if (user) {
    if (!user.email) {
      const email = msg.text.toString().toLowerCase();
      const validate = validateEmail(email);
      if (validate.error) {
        return bot.sendMessage(
          chatId,
          "Wrong email, try real email(email is not valid)"
        );
      }
      user.email = email;
      bot.sendMessage(chatId, "Enter password");
      return;
    } else if (!user.password) {
      const password = msg.text.toString();
      const validate = validatePassword(password);
      if (validate.error) {
        return bot.sendMessage(
          chatId,
          "Something wrong with password(not valid)"
        );
      }
      // bcrypt виконує функцію безпеки, щоб той хто має доступ до бази бачив лише захешований пароль
      user.password = await bcrypt.hash(password, 10);
      addUser(user, chatId);
      delete users[chatId];
      return;
    }
  }

  if (
    msg.text.toString().toLowerCase().indexOf("btc") === 0 ||
    msg.text.toString().toLowerCase().indexOf("eth") === 0
  ) {
    const coin = msg.text.toString();
    authAudit(chatId, () => {
      coinMessage(chatId, coin);
      return;
    });
  }
});

// Оскільки немає адмінки та інтерфейса тому цей запит зроблений не захищенним.
// Для серьозного проекта тут додається міддлвар перевірки прав та авторизації користувача
app.use("/mailing", (req, res, next) => {
  db.query("SELECT * FROM `users`", function (err, result) {
    spamMessage(result);
  });
  res.status(200).json("all good");
});

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
