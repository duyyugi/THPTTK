const express = require('express');
const router = express.Router();
const nvdangtinController = require('../controllers/nvdangtin.controller');

router.get('/',nvdangtinController.hienThiThemSPQC);

router.post('/submitQC', nvdangtinController.themSanPhamQC);

router.get('/showlistproducts', nvdangtinController.xemDSQuangCao);

router.get('/ngungquangqc', nvdangtinController.hienThiNgungQC);

router.post('/ngungquangqc', nvdangtinController.ngungQC);

module.exports = router;