const mcAssets = require('minecraft-assets')('1.13')

console.log('https://raw.githubusercontent.com/rom1504/minecraft-assets/master/data/1.13/' + mcAssets.getTexture('wheat_seeds') + '.png')

console.log(mcAssets.textureContent.wheat_seeds.texture)

console.log(require('minecraft-assets').versions)
