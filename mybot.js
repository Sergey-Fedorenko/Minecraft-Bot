const mineflayer = require("mineflayer")

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "1354",
    version: "1.18.2",
    username: "MyBot" })

    // Вывод сообщения в чат при входе на сервер
    bot.once('spawn', function () {
        bot.chat('Привет мир!');
});

    // Ответ на сообщения в чате CTR + C (Перезагрузить бота)
        bot.on('chat', function Hi (username,message) {
            if(message === "Ты бот?" && username ==="Bebra_2005") {
        setTimeout(() => bot.chat(username + " , нет я не бот"), 5000);
    }
    });
