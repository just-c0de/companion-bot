process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('1204141063:AAEf_z2X2ZPHLrlmC3uo4sC1UJKRXt0XJ6k', {polling: true});

let store = {}

function onNew(msg) {

    if (store[msg.chat.id] === undefined) {
        store[msg.chat.id] = {}
    }
    store[msg.chat.id].newTopic = true
    bot.sendMessage(msg.chat.id, "Введите название новой темы")
}

function onList(msg) {
    let response = ""

    for (let i = 0; i < store[msg.chat.id].topics.length; i++) {
        response = response + store[msg.chat.id].topics[i] + " /delete" + i + "\r\n"

    }

    bot.sendMessage(msg.chat.id, response === ""? "Список тем ПУСТ!": response)

}

function onDelete(msg) {
    let id = parseInt(msg.text.substr("/delete".length))
    store[msg.chat.id].topics.splice(id, 1)
}

bot.on('message', (msg) => {

    if (msg.text.startsWith("/list")) {
        onList(msg)
        return
    }

    if (msg.text.startsWith("/new") === true && (store[msg.chat.id] === undefined || store[msg.chat.id].newTopic === false)) {
        onNew(msg)
        return
    }

    if (msg.text.startsWith("/delete")) {
        onDelete(msg)
        return
    }

    if (store[msg.chat.id] !== undefined && store[msg.chat.id].newTopic === true) {
        if (store[msg.chat.id].topics  === undefined) {
            store[msg.chat.id].topics = []
        }
        store[msg.chat.id].topics.push(msg.text)
        bot.sendMessage(msg.chat.id, "Тема успешно добавлена")
        store[msg.chat.id].newTopic = false
    }
})


