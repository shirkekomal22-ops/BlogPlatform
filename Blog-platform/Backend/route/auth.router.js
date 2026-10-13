const express = require('express');

const router = express.Router();

const { register,login,getMe} = require('../controller/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me/:id', getMe);

module.exports = router;