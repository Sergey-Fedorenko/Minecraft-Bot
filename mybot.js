const mineflayer = require("mineflayer")
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const autoeat = require('mineflayer-auto-eat')

// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "31278",
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

    //По команде скидывает предметы из инвентаря
    bot.on('chat',function (username,message){
        if(username === "MyBot") return;
        if (message === "Drop" && username === "Sergey"){
            function tossNext(){
                if(bot.inventory.items().length === 0) {
                    console.log("У меня пусто")
                } else {
                    const item = bot.inventory.items()[0]
                    bot.tossStack(item,tossNext)
                }
            }
            tossNext()
        }
    });


