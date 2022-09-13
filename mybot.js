const mineflayer = require("mineflayer")

const bot = mineflayer.createBot({
    host: "localhost",
    port: "1683",
    version: "1.18.2",
    username: "MyBot" })

bot.once('spawn', function () {
    bot.chat('Привет мир!')
})
