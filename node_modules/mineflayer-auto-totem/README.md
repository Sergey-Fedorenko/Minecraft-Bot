# What is this?

Its a plugin for mineflayer that can be used to make your bot automatically equip totems

# Installation

`npm i mineflayer-auto-totem --save`

# Usage

```js
const mineflayer = require('mineflayer')
const { autototem } = require('mineflayer-auto-totem')

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'bot1', // minecraft username
})

bot.loadPlugin(autototem)

bot.on("physicsTick", async () => {
    bot.autototem.equip()
})
```
![usagegif](https://cdn.discordapp.com/attachments/865897316043718676/875180370612592670/ezgif.com-gif-maker2.gif)
