const mineflayer = require("mineflayer")
const mineflayerViewer = require('prismarine-viewer').mineflayer

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "5209",
    version: "1.18.2",
    username: "MyBot" })

//---------------------------------------------------------------------
    // Вывод сообщения в чат при входе на сервер
    bot.once('spawn', function () {
        bot.chat('Привет мир!');
    });
//---------------------------------------------------------------------

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
//---------------------------------------------------------------------


    // Смотрим за сервером через браузер
    bot.once('spawn',() =>{
        mineflayerViewer(bot,{
            port:3007,
            firstPerson:true,
            viewDistance: "25"})
    })
//---------------------------------------------------------------------

    // Укладываем бота спать
    bot.on('chat',(username,message)=>{
        if(username === bot.username) return

        switch (message){
            case 'Спать':
                goToSleep()
                break
            case 'Вставай':
                wakeUp()
                break
            case 'Выйди':
                bot.quit()
                break
        }
    });

    bot.on('sleep',()=>{
        bot.chat('Спокойной ночи')
    });

    bot.on('wake',()=>{
        bot.chat('Доброе утро')
    });

    async function goToSleep() {
        const bed = bot.findBlock({
            matching: block => bot.isABed(block)
        })

        if (bed) {
            try {
                await bot.sleep(bed)
                bot.chat("Я сплю")
            } catch (err) {
            bot.chat(`Я не могу уснуть: ${err.message}`)
            }
    } else {
    bot.chat('По близости нет кровати')
    }
}

    async function  wakeUp() {
        try {
            await bot.wake()
        } catch (err) {
            bot.chat(`Я не могу проснуться: ${err.message}`)
        }
    }
//---------------------------------------------------------------------



