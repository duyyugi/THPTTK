let express = require('express');
let router = express.Router();
let workerController = require('../controllers/nhanvien.controller');


router.get('/login',workerController.getLogin)

router.post('/login',workerController.postLogin);
router.get('/logout', workerController.getLogout)

module.exports = router;