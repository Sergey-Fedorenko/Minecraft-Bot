const mineflayer = require("mineflayer")
const mineflayerViewer = require('prismarine-viewer').mineflayer

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "13879",
    version: "1.18.2",
    username: "MyBot" })

    // Вывод сообщения в чат при входе на сервер
    bot.once('spawn', function () {
        bot.chat('Привет мир!');
    });


    // Чат
    bot.on('chat', function Hi (username,message) {
        if(username === "MyBot") return;
          if (message === "Ты бот?" && username === "Sergey") {
              setTimeout(() => bot.chat(username + " , нет я не бот"), 5000);
          } else {
              if(message !== "Ты бот?") return;
              setTimeout(() => bot.chat(username + " , я тебя не знаю"), 5000);
          }
    });

    // Смотрим за сервером через браузер
    bot.once('spawn',() =>{
        mineflayerViewer(bot,{
            port:3007,
            firstPerson:true,
            viewDistance: "25"})
    })





