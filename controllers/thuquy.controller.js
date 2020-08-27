let hoaDonModel = require('../models/hoadon.model');
let CTHDModel = require('../models/chitiethoadon.model');
let hoaDonTTTModel = require('../models/hoadonthanhtoanthe.model');

module.exports = {
    hienThiThanhToan: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'Thủ quỹ') {
                res.sendStatus(404);
            } else {
                try {
                    if ((req.query.maHD == null) || (req.query.maHD.trim() == '')) {
                        req.query.maHD = null;
                    }
                    if ((req.query.trangthaiHD == null) || (req.query.trangthaiHD.trim() == '')) {
                        req.query.trangthaiHD = null;
                    }
                    if ((req.query.cachthucTT == null) || (req.query.cachthucTT.trim() == '')) {
                        req.query.cachthucTT = 0;
                    }
                    let trangthaiHD = req.query.trangthaiHD;
                    let cachthucTT = req.query.cachthucTT;
                    let maHD = req.query.maHD;
                    let HoaDon = await hoaDonModel.layThongTinHD(maHD, trangthaiHD);
                    HoaDon = HoaDon.recordset;
                    if (!trangthaiHD) {
                        res.render("VthuQuy/thanhtoan", {
                            status: false,
                            cachthucTT: cachthucTT
                        })
                    } else {
                        if (trangthaiHD == 'chuathanhtoan') {
                            res.render("VthuQuy/thanhtoan", {
                                HoaDon: HoaDon,
                                status: false,
                                cachthucTT: cachthucTT
                            })
                        } else {
                            res.render("VthuQuy/thanhtoan", {
                                HoaDon: HoaDon,
                                status: true,
                                cachthucTT: cachthucTT
                            })
                        }
                    }
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    layChiTietHoaDon: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'Thủ quỹ') {
                res.sendStatus(404);
            } else {
                try {
                    let maHD = req.body.maHD;
                    let chiTietHD = await CTHDModel.layCTHDtheoMa(maHD);
                    let lienQuanHD = await hoaDonModel.layTTLienQuan(maHD);
                    chiTietHD = chiTietHD.recordset;
                    lienQuanHD = lienQuanHD.recordset[0];
                    res.json({
                        chiTietHD: chiTietHD,
                        lienQuanHD: lienQuanHD
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    xacNhanThanhToan: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'Thủ quỹ') {
                res.sendStatus(404);
            } else {
                try {
                    let maHD = req.body.maHD;
                    let cachthucTT = req.body.cachthucTT
                    let status = false;
                    // Doi hoa don tu chua xac nhan thanh xac nhan
                    let xacNhanHoaDon = await hoaDonModel.xacNhanHoaDon(maHD, cachthucTT);
                    if (xacNhanHoaDon.rowsAffected[0] == 1) {
                        status = true;
                    }
                    res.json({
                        status: status
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    lapHoaDonThanhToanThe: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'Thủ quỹ') {
                res.sendStatus(404);
            } else {
                try {
                    let cachTTThe = req.body.cachTTThe;
                    let maGiaoDich = req.body.maGiaoDich;
                    let maHD = req.body.maHD;
                    let lapHDTTT = await hoaDonTTTModel.lapHoaDonThanhToanThe(maHD, cachTTThe, maGiaoDich);
                    if (lapHDTTT.rowsAffected[0] == 1) {
                        res.json({
                            status: true
                        })
                    } else {
                        res.json({
                            status: false
                        })
                    }
                } catch (err) {
                    next(err);
                }
            }
        }
    }
}