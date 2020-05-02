var messageModel = require('../models/messageDB')

exports.message_view_new = async function (req, res) {
    try {
        query = await messageModel.seeNewMessages();
        res.send(await query);
    }
    catch (e) {res.sendStatus(500)}
}

exports.message_view_all = async function (req, res) {
    try {
        query = await messageModel.seeAllMessages();
        res.send(await query);
    }
    catch (e) {res.sendStatus(500)}
}

exports.message_view_one = async function (req, res) {
    try {
        message = await messageModel.getMessage(req.params.id)
        res.send(message);
    }
    catch (e) {res.sendStatus(404)}
}

exports.message_leave_new = async function (req, res) {
    var author = req.body.author;
    var date = req.body.date;
    var title = req.body.title;
    var message = req.body.message;
    var read = req.body.read;
    if (!(author && date && title && message && read == false)) {
        res.sendStatus(400);
    }
    else {
        try {
            let resp = await messageModel.leaveMessage(date, title, message, author, read)
            res.status(201).json(resp)
        }
        catch (e) {res.status(500).send(e)}
    }
}
 
exports.message_change_welcome = async function (req, res) {
    var message = req.body.message;
    if (!message) {
        res.sendStatus(400);
    }
    else {
        try {
            let resp = await messageModel.newWelcome(message);
            res.status(200).send(resp);
        }
        catch (e) {res.status(500).send(e)}
    }
}

exports.message_change_read = async function (req, res)  {
    try {
        var id = req.params.id;
        let resp = await messageModel.changeReadStatus(id);
        res.status(200).send(resp)
    }
    catch (e) {
        if (e === 400)
            res.status(400).send('Bad request - Message with id \'welcome\' cannot be flagged as read.')
        else 
            res.sendStatus(404)
    }
}

exports.message_delete = async function (req, res) {
    try {
        var id = req.params.id;
        let resp = await messageModel.deleteMessage(id);
        res.status(200).send(resp)
    }
    catch (e) {res.sendStatus(404)}
}