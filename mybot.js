const mineflayer = require("mineflayer")

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "23155",
    version: "1.18.2",
    username: "MyBot" })

    // Вывод сообщения в чат при входе на сервер
    bot.once('spawn', function () {
        bot.chat('Привет мир!');
    });


    bot.on('chat', function Hi (username,message) {
        if(username === "MyBot") return;
          if (message === "Ты бот?" && username === "Sergey") {
              setTimeout(() => bot.chat(username + " , нет я не бот"), 5000);
          } else {
              setTimeout(() => bot.chat(username + " , я тебя не знаю"), 5000);
          }
    });

