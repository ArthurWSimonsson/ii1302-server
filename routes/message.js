var express = require('express');
var router = express.Router();
var cors = require('cors');

/* Author Arthur Simonsson */

/* All message related routes */

var message_controller = require('../controllers/messageController');

/* Gets all messages flagged as unread (through {read : false}) */
router.get('/message/new', cors(), message_controller.message_view_new);

/* Gets all messages received, both read and unread. */
router.get('/message/all', cors(), message_controller.message_view_all);

/* Gets a single message identified by it's 'id' */
router.get('/message/:id', cors(), message_controller.message_view_one);

/* Leaves a new message */
router.post('/message/', cors(), message_controller.message_leave_new);

/* Changes welcome message */
router.put('/message/welcome', cors(), message_controller.message_change_welcome);

/* Flags an unread message as read */
router.put('/message/read/:id', cors(), message_controller.message_change_read);

/* Deletes a message identified by 'id' */
router.delete('/message/:id', cors(), message_controller.message_delete);

module.exports = router;

// app.get('/get/:id', (req, res) => {res.send('Hello World!'); console.log(req)});