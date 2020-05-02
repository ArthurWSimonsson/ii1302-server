/***************************
 * // for visitors
 * {     
 *       "id": "xx" // auto-generated, do not enter 
 *   "author": "xx xx" 
 *    "title": "xx"
 *  "message": "xxx"
 *     "date": "xx/xx/xx xx.xx.xx"
 *     "read": true/false
 * }
 * 
 * // for owner
 * {    
 *       "id" : "welcome"
 *   "message": "xxx"
 * 
 * }
 * 
 ***************************/
var dbModule = require('../app');

// Design Document
const view_messages = {
    "_id" : "_design/view-messages",
    "views" : {
        "messages_all" : {
        "map": "function(doc) {if (doc.author) emit(doc.date, {author : doc.author, title: doc.title})}"
        },
        "messages_unread" : {
        "map": "function(doc) {if(doc.read == false) emit(doc.date, {author : doc.author, title: doc.title})}"
        }
    }
}

exports.leaveMessage = function(date, title, message, author, read) {
    try {
        return dbModule.db.insert({author:author, title:title, date:date , message:message, read:read}).then((body) => {
            return body
        })
    }
    catch (error) {throw 500}
}

exports.seeAllMessages = function() {
    try {
        return dbModule.db.view('view-messages','messages_all').then((data) => {return data.rows});
    }
    catch (error) {throw 500}
}

exports.seeNewMessages = function () {
    try {
        return dbModule.db.view('view-messages','messages_unread').then((data) => {return data.rows});
    }
    catch (error) {throw 500}
}

exports.getMessage = function (id) {
    try {
        return dbModule.db.get(`${id}`).then((data) => {return data})
    }
    catch (error) {throw 404}
} 

exports.newWelcome = async function (message) {
    try {
        return await dbModule.db.get('welcome').then(doc => {doc.message = message; return dbModule.db.insert(doc).then(doc => {return doc})});
    }
    catch (error) {throw 500}
}

exports.changeReadStatus = async function (id) {
    try {
        if (id !== 'welcome')
            return await dbModule.db.get(`${id}`).then(doc => {doc.read = true; return dbModule.db.insert(doc).then(doc => {return doc})});
        else
            throw 400
    }
    catch (error) {
        if (error === 400)
            throw 400;
        else
            throw 404;
    }
}
 
exports.deleteMessage = async function(id) {
    try {
        return await dbModule.db.get(`${id}`).then(doc => {return dbModule.db.destroy(doc._id, doc._rev).then(doc => {return doc})});
    }
    catch (error) {throw 404}
}