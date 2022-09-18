const mineflayer = require("mineflayer")

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "6648",
    version: "1.18.2",
    username: "MyBot" })

// Вывод сообщения в чат при входе на сервер
bot.once('spawn', function () {
    bot.chat('Привет мир!')
})

// Ответ на сообщения в чате
bot.on('chat', function (username,message){
    if(message === "Ты бот?"){
        bot.chat("Нет! Я не бот")
    }
})