/***************************
 * // for visitors
 * {     
 *       id: xx // auto-generated
 *   author: xx xx 
 *  message: xxx
 *     date: xx-xx-xx xx.xx.xx
 *     read: true/false (with date?)
 * }
 * 
 * // for owner
 * {
 *      main: true
 *   message: xxx
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
    // console.log(`author is ${author} date is ${date} message is ${message}`)
    dbModule.db.insert({author:author, title:title, date:date , message:message, read:read}).then((body) => {
        console.log(body)
    })
}

exports.seeAllMessages = function() {
    return dbModule.db.view('view-messages','messages_all').then((data) => {console.log(data); return data.rows});
}
//{include_docs: true} : param to include docs in query
exports.seeNewMessages = function () {
    return dbModule.db.view('view-messages','messages_unread').then((data) => {console.log(data); return data.rows});
}

exports.getMessage = function (id) {
    return dbModule.db.get(`${id}`).then((data) => {console.log(data); return data;})
} 

exports.newWelcome = function (message) {
    dbModule.db.get('welcome').then(doc => {doc.message = message; dbModule.db.insert(doc).then(doc => console.log(doc))});
}

exports.changeReadStatus = function (id) {
    dbModule.db.get(`${id}`).then(doc => {doc.read = true; dbModule.db.insert(doc).then(doc => console.log(doc))}); 
}
 
exports.deleteMessage = function(id) {
    dbModule.db.get(`${id}`).then(doc => {console.log('get',doc); dbModule.db.destroy(doc._id, doc._rev).then(doc => console.log(doc))});
}

//examples functions beneath, won't be used.

// var createDocument = function(callback) {
//     console.log("Creating document 'mydoc'");
//     // specify the id of the document so you can update and delete it later
//     db.insert({ _id: 'mydoc', a: 1, b: 'two' }, function(err, data) {
//       console.log('Error:', err);
//       console.log('Data:', data);
//       callback(err, data);
//     });
//   };

// var readDocument = function(callback) {
//     console.log("Reading document 'mydoc'");
//     db.get('mydoc', function(err, data) {
//       console.log('Error:', err);
//       console.log('Data:', data);
//       // keep a copy of the doc so you know its revision token
//       doc = data;
//       callback(err, data);
//     });
// };

// var updateDocument = function(callback) {
//     console.log("Updating document 'mydoc'");
//     // make a change to the document, using the copy we kept from reading it back
//     doc.c = true;
//     db.insert(doc, function(err, data) {
//       console.log('Error:', err);
//       console.log('Data:', data);
//       // keep the revision of the update so we can delete it
//       doc._rev = data.rev;
//       callback(err, data);
//     });
// };

// var deleteDocument = function(callback) {
//     console.log("Deleting document 'mydoc'");
//     // supply the id and revision to be deleted
//     db.destroy(doc._id, doc._rev, function(err, data) {
//       console.log('Error:', err);
//       console.log('Data:', data);
//       callback(err, data);
//     });
// };


// cloudant.db.list(function(err, body) {
//     body.forEach(function(db) {
//         console.log(db);
//     });
// });