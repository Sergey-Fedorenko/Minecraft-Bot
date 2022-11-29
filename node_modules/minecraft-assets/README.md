# node-minecraft-assets
[![NPM version](https://img.shields.io/npm/v/minecraft-assets.svg)](http://npmjs.com/package/minecraft-assets)
[![Build Status](https://github.com/PrismarineJS/node-minecraft-assets/workflows/CI/badge.svg)](https://github.com/PrismarineJS/node-minecraft-assets/actions?query=workflow%3A%22CI%22)
[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/GsEFRM8)
[![Gitter](https://img.shields.io/badge/chat-on%20gitter-brightgreen.svg)](https://gitter.im/PrismarineJS/general)
[![Irc](https://img.shields.io/badge/chat-on%20irc-brightgreen.svg)](https://irc.gitter.im/)

[![Try it on gitpod](https://img.shields.io/badge/try-on%20gitpod-brightgreen.svg)](https://gitpod.io/#https://github.com/PrismarineJS/node-minecraft-assets)

Provide easy access to [minecraft-assets](https://github.com/rom1504/minecraft-assets) in node.js

## Example

```js
const mcAssets=require("minecraft-assets")("1.8.8")

console.log("https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.8.8/"+mcAssets.getTexture("wheat_seeds")+".png")

console.log(mcAssets.textureContent["wheat_seeds"].texture)
```

## Documentation

 * See [doc/api.md](doc/api.md)
 * See [doc/history.md](doc/history.md)
 