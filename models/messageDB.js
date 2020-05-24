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

/* Author Arthur Simonsson */

/* All calls to Cloudant database. */
/* Status thrown on error : - 500: server error -400: bad request -404: not found */

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

/* Insert new message in database */
exports.leaveMessage = function(date, title, message, author, read) {
    try {
        return dbModule.db.insert({author:author, title:title, date:date , message:message, read:read}).then((body) => {
            return body
        })
    }
    catch (error) {throw 500}
}

/* Get the view holding all messages */
exports.seeAllMessages = function() {
    try {
        return dbModule.db.view('view-messages','messages_all').then((data) => {return data.rows});
    }
    catch (error) {throw 500}
}

/* Get the view holding all unread messages */
exports.seeNewMessages = function () {
    try {
        return dbModule.db.view('view-messages','messages_unread').then((data) => {return data.rows});
    }
    catch (error) {throw 500}
}

/* Get specific message */
exports.getMessage = function (id) {
    try {
        return dbModule.db.get(`${id}`).then((data) => {return data})
    }
    catch (error) {throw 404}
} 

/* Inserts/stores new homescreen message */
exports.newWelcome = async function (message) {
    try {
        return await dbModule.db.get('welcome').then(doc => {doc.message = message; return dbModule.db.insert(doc).then(doc => {return doc})});
    }
    catch (error) {throw 500}
}

/* Changes read status on a message */
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

/* Deletes a message */
exports.deleteMessage = async function(id) {
    try {
        return await dbModule.db.get(`${id}`).then(doc => {return dbModule.db.destroy(doc._id, doc._rev).then(doc => {return doc})});
    }
    catch (error) {throw 404}
}