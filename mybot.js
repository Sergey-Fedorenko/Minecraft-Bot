const mineflayer = require("mineflayer")

const bot = mineflayer.createBot({
    host: "localhost",
    port: "6648",
    version: "1.18.2",
    username: "MyBot" })

bot.once('spawn', function () {
    bot.chat('Привет мир!')
})

bot.on('chat', function (username,message){
    if(message === "Ты бот?"){
        bot.chat("Нет! Я не бот")
    }
})