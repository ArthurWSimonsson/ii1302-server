var model = require('../models/messageDB')



exports.message_view_new = function (req, res) {
    res.send("hello");

}

exports.message_view_all = function (req, res) {

}

exports.message_view_one = function (req, res) {

}

exports.message_leave_new = function (req, res) {
    var author = req.body.author;
    var date = req.body.date;
    var message = req.body.message;
    // console.log(req)
    console.log(`author is ${author} date is ${date} message is ${message}`)
    model.leaveMessage(author, date, message)
    res.end("yes");
}
 
exports.message_change_welcome = function (req, res) {

}

exports.message_change_read = function (req, res)  {

}

exports.message_delete = function (req, res) {

}