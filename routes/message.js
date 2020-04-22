var express = require('express');
var router = express.Router();
var cors = require('cors');


var message_controller = require('../controllers/messageController');

router.get('/message/new', cors(), message_controller.message_view_new);

router.get('/message/all', cors(), message_controller.message_view_all);

router.get('/message/:id', cors(), message_controller.message_view_one);

router.post('/message/', cors(), message_controller.message_leave_new);

router.put('/message/welcome', cors(), message_controller.message_change_welcome);

router.put('/message/read/', cors(), message_controller.message_change_read);

router.delete('/message/:id', cors(), message_controller.message_delete);

module.exports = router;

// app.get('/get/:id', (req, res) => {res.send('Hello World!'); console.log(req)});