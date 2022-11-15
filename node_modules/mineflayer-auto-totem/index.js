function inject(bot) {
    bot.autototem = {}
    bot.autototem.equip = () => {
        if (bot.inventory.slots[45] != null) return
        const totem = bot.inventory.findInventoryItem('totem_of_undying', null, null)
        if (totem) {
            bot.inventory.requiresConfirmation = false
            bot.equip(totem, 'off-hand')
        }
    }
}

module.exports = {
    autototem: inject
}
