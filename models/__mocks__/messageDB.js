/* Author Arthur Simonsson */

/* Mocked database calls for testing with jest */

exports.seeNewMessages = function () {
    return mockDesignView
}

exports.seeAllMessages = function () {
    return mockDesignView
}

exports.getMessage = function (id) {
    if (id !== 'welcome')
        throw 404
    else 
        return mockDocument;
}

exports.leaveMessage = function(date, title, message, author, read) {
    return mockDocBody;
}

exports.newWelcome = function (message) {
    return mockDocBodyWelcome
}

exports.changeReadStatus = function (id) {
    if (id === 'welcome')
        throw 400
    let found = mockDocList.filter(document => {return document.id === id;})
    if (found[0].id !== null) {
        return mockDocBody
    }
    else
        throw 404
}

exports.deleteMessage = function(id) {
    let found = mockDocList.filter(document => {return document.id === id;})
    if (found[0].id !== null) {
        return mockDocBody
    }
    else
        throw 404
}


/* Most constants are real database responses. These are used because if every endpoint is tested with an external database call, the total duration might become to long */
/* A body is metadata about a document */


const mockDocList = [
    {
        "id": "1",
        "rev": "1",
        "message" : "hello"
    },
    {
        "id": "2",
        "rev": "2",
        "message" : "when are you back?"
    },    
    {
        "id": "3",
        "rev": "3",
        "message" : "what is your phone number?"
    }
]

const mockDocBodyWelcome =
{
    "ok": true,
    "id": "welcome",
    "rev": "104-b25542bc8d2c8fc0668bc15b37d19b1e"
}

const mockDocument = {
    "id": "welcome",
    "rev": "91-ba5522ecaa73dfacf1efc42f8edf8dfd",
    "message": "new"
}

const mockDocBody = {
    "ok": true,
    "id": "f86f371f58a87750e659517fd305a97f",
    "rev": "1-5a53bba2b71da12c31043b9696cdfda1"
}

const mockDesignView = [
    {
        "id": "ef71fa788697621451df116e63592ed2",
        "key": "1909-05-21 02:25:09",
        "value": {
            "author": "Victoria L",
            "title": "pyramid scheme"
        }
    },
    {
        "id": "bf73e056f376f6e330b39120542a572c",
        "key": "2009-10-08 08:01:05",
        "value": {
            "author": "Kristina W",
            "title": "horsepower"
        }
    }
]