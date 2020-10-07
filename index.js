process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('1204141063:AAEf_z2X2ZPHLrlmC3uo4sC1UJKRXt0XJ6k', {polling: true});

let db = require("./store/db")

function onNew(msg) {

    if (db.store[msg.chat.id] === undefined) {
        db.store[msg.chat.id] = {}
    }
    db.store[msg.chat.id].newTopic = true
    bot.sendMessage(msg.chat.id, "Введите название новой темы")
}

function onList(msg) {
    let response = ""

    for (let i = 0; i < db.store[msg.chat.id].topics.length; i++) {
        response = response + db.store[msg.chat.id].topics[i] + " /delete" + i + "\r\n"

    }

    bot.sendMessage(msg.chat.id, response === ""? "Список тем ПУСТ!": response)

}

function onDelete(msg) {
    let id = parseInt(msg.text.substr("/delete".length))
    db.store[msg.chat.id].topics.splice(id, 1)
}

bot.on('message', (msg) => {

    if (msg.text.startsWith("/list")) {
        onList(msg)
        return
    }

    if (msg.text.startsWith("/new") === true && (db.store[msg.chat.id] === undefined || db.store[msg.chat.id].newTopic === false)) {
        onNew(msg)
        return
    }

    if (msg.text.startsWith("/delete")) {
        onDelete(msg)
        return
    }

    if (db.store[msg.chat.id] !== undefined && db.store[msg.chat.id].newTopic === true) {
        if (db.store[msg.chat.id].topics  === undefined) {
            db.store[msg.chat.id].topics = []
        }
        db.store[msg.chat.id].topics.push(msg.text)
        bot.sendMessage(msg.chat.id, "Тема успешно добавлена")
        db.store[msg.chat.id].newTopic = false
    }
})


