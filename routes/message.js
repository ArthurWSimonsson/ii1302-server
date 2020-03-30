var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/messageController');

router.get('/message/new', message_controller.message_view_new);

router.get('/message/all', message_controller.message_view_all);

router.get('/message/:id', message_controller.message_view_one);

router.post('/message/', message_controller.message_leave_new);

router.put('/message/welcome', message_controller.message_change_welcome);

router.post('/message/read/:id', message_controller.message_change_read);

router.delete('/message/:id', message_controller.message_delete);

// app.get('/get/:id', (req, res) => {res.send('Hello World!'); console.log(req)});