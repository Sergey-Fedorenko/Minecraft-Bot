const mineflayer = require("mineflayer")
const mineflayerViewer = require('prismarine-viewer').mineflayer
const {autototem} = require("mineflayer-auto-totem");
const {BossBar} = require("mineflayer");
const options = require("options");
const pathfinder = require('mineflayer-pathfinder').pathfinder



// Подключение бота к серверу
const bot = mineflayer.createBot({
    host: "localhost",
    port: "3789",
    version: "1.18.2",
    username: "MyBot" });



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
    bot.chat('Поблизости нет кровати')
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
//---------------------------------------------------------------------
    // Авто-кликер
    bot.on('spawn', function (){
        bot.loadPlugin(require("mineflayer-autoclicker"))
 //       bot.autoclicker.start()  Автоматический запуск авто-кликера, когда бот заходит на сервер (необязательно)
    })

    bot.on('chat', function (usrername, message){
        if(message === "Start") {
            bot.autoclicker.start()
        }

        if(message === "Stop") {
            bot.autoclicker.stop()
        }
    });
//---------------------------------------------------------------------
    // Взаимодействие с коровами
//  bot.on('spawn', async function() {
//      await startMilking()
//      async function startMilking() {
//          setTimeout(async function() {
//
//              let nearbyCows = Object.values(bot.entities).filter(e => e.name == 'cow' && e.position.distanceTo(bot.entity.position) < 5
//                && !e.metadata[16]);
//
//              let cow = nearbyCows[Math.floor(Math.random() * nearbyCows.length)];
//
//             await bot.lookAt(cow.position, false)
//
//              let empty_bucket = bot.inventory.items().filter(item => item.name == 'bucket')[0];
//
//             /* if(!empty_bucket) {
//                 console.log('[Предупреждение] В моем инвентаре нет пустого ведра');
//                 return startMilking(); */ // По желанию вывод в консоль
//
//              await startMilking();
//    }, 2000)
//  }
// });
//---------------------------------------------------------------------
    // Считаем значения Здоровья и Еды
bot.on('chat', function (username,message){
    if(message === "Здоровье"){
        bot.chat('У меня ' + bot.health.toFixed(0) + ' здоровье')
    }
    if(message === "Еда"){
        bot.chat(`У меня ` + bot.food + ` еды`)
    }
    if(message === "Опыт"){
        bot.chat("У меня " + bot.experience.points.toFixed(0) + " опыта" )
    }
    if(message === "Уровень"){
         bot.chat('У меня ' + bot.experience.level.toFixed(0) + ' уровень')
    }
});
//------------------------------------------------
    //Автоматическая экипировка тотемов
    bot.loadPlugin(autototem)
    bot.on("physicsTick", async() =>{
        bot.autototem.equip()
    })


//------------------------------------------------
    //Поиск пути в игроку

// let coming = false
// bot.loadPlugin(pathfinder)
//
// bot.once('spawn', () => {
//     const mcData = require('minecraft-data')(bot.version)
//     const defaultMove = new Movements(bot, mcData)
//     bot.pathfinder.setMovements(defaultMove)
//
//     bot.on('chat', (username, message) => {
//         const args = message.split(' ')
//         switch (args[0]) {
//             case 'come':
//                 coming = true
//                 const target = bot.players[username]?.entity
//                 if (!target) {
//                     bot.chat(username + " я тебя не вижу")
//                     return
//                 }
//                 const {x: playerX, y: playerY, z: playerZ} = target.position
//                 bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1))
//                 return

//         }
//     });
// });
// bot.on('goal_reached', () => {
//     if (!coming) part()
//     if (coming) coming = false
// });

    //Автоматическая экипировка брони
    const armorManager = require('mineflayer-armor-manager')
    bot.loadPlugin(armorManager)

    // Web-радар
    const radarPlugin = require('mineflayer-radar')(mineflayer);
    radarPlugin(bot, options);


    //web-инвентарь
    const inventoryViewer = require('mineflayer-web-inventory')
    inventoryViewer(bot)
