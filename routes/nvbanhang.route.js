let express = require('express');
let router = express.Router();
let nvbanhangController = require('../controllers/nvbanhang.controller');

let commentmathangModel = require('../models/commentmathang.model');
let commentkhachhangModel = require('../models/commentkhachhang.model')

router.get('/lapphieutrahang', nvbanhangController.hienThiLapPhieuTraHang)

router.post('/lapphieutrahang', nvbanhangController.lapPhieuTraHang)

router.get('/', nvbanhangController.hienThiLapYCNhapHang)

router.post('/lapphieuyeucaunhaphang', nvbanhangController.lapYCNhapHang)

router.get('/loccomment', nvbanhangController.hienThiLocComment)

router.post('/phanloaicommenttot', nvbanhangController.phanLoaiCommentTot)

router.post('/phanloaicommentxau', nvbanhangController.phanLoaiCommentXau)

router.get('/nganquyengopykhachhang', nvbanhangController.hienThiNganQuyenGopYKH)


router.post('/camquyencomment', nvbanhangController.camQuyenComment)

module.exports = router;