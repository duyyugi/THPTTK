let express = require('express');
let router = express.Router();
let thuquyController = require('../controllers/thuquy.controller');

router.get('/', thuquyController.hienThiThanhToan);

router.post('/chitiethoadon', thuquyController.layChiTietHoaDon);

router.post('/xacnhanhoadon', thuquyController.xacNhanThanhToan);

router.post('/laphoadonthanhtoanthe', thuquyController.lapHoaDonThanhToanThe);

module.exports = router;