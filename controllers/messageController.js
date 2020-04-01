var messageModel = require('../models/messageDB')

exports.message_view_new = async function (req, res) {
    query = await messageModel.seeNewMessages();
    res.send(await query);
}

exports.message_view_all = async function (req, res) {
    query = await messageModel.seeAllMessages();
    res.send(await query);
}

exports.message_view_one = async function (req, res) {
    message = await messageModel.getMessage(req.params.id)
    // console.log('mes', message)
    // console.log('id',req.params.id)
    res.send(message)

}

exports.message_leave_new = function (req, res) {
    var author = req.body.author;
    var date = req.body.date;
    var title = req.body.title;
    var message = req.body.message;
    var read = req.body.read;
    // console.log(`author is ${author} date is ${date} message is ${message} read is ${read}`)
    messageModel.leaveMessage(date, title, message, author, read)
    res.end("yes");
}
 
exports.message_change_welcome = function (req, res) {
    var message = req.body.message;
    messageModel.newWelcome(message);
    res.end('yes');
}

exports.message_change_read = function (req, res)  {
    var id = req.body.id;
    messageModel.changeReadStatus(id);
    res.end('yes')
}

exports.message_delete = function (req, res) {
    var id = req.params.id;
    console.log('id', req.params.id)
    messageModel.deleteMessage(id);
    res.end('yes')
}