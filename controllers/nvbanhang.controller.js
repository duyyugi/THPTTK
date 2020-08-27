const MatHangModel = require('../models/mathang.model');
const NCCModel = require('../models/nhacungcap.model');
const DTHModel = require('../models/dontrahang.model');
const donNhapHangModel = require('../models/donnhaphang.model');
const ctDonNhapHangModel = require('../models/chitietdnh.model');
const commentmathangModel = require('../models/commentmathang.model');
const commentkhachhangModel = require('../models/commentkhachhang.model')

module.exports = {
    hienThiLapPhieuTraHang: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            }
            else {
                try {
                    if ((req.query.soLuong == null) || (req.query.soLuong.trim() == '')) {
                        req.query.soLuong = 10;
                    }
                    if ((req.query.maNCC == null) || (req.query.maNCC.trim() == '')) {
                        req.query.maNCC = 1;
                    }
                    let NVBH = req.session.user;
                    let soLuong = req.query.soLuong;
                    let maNCC = req.query.maNCC;
                    let DSmatHangTra = await MatHangModel.layHangBiTraTheoSL(soLuong, NVBH.MaNV, maNCC);
                    let DSnhaCungCap = await NCCModel.layTatCaNCC();
                    let NCCHienTai = await NCCModel.layNCCTheoMa(maNCC)
                    DSmatHangTra = DSmatHangTra.recordset;
                    DSnhaCungCap = DSnhaCungCap.recordset;
                    NCCHienTai = NCCHienTai.recordset[0];
                    for (let i in DSnhaCungCap) {
                        if (DSnhaCungCap[i].MaNCC == NCCHienTai.MaNCC) {
                            DSnhaCungCap.splice(i, 1);
                        }
                    }
                    res.render("VnvBanHang/lapphieutrahang", {
                        DSnhaCungCap: DSnhaCungCap,
                        DSmatHangTra: DSmatHangTra,
                        NCCHienTai: NCCHienTai,
                        soLuongTT: soLuong
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    lapPhieuTraHang: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    chuoiDSMatHang = req.body.chuoiDSMatHang;
                    if (chuoiDSMatHang == '') {
                        res.json({
                            status: 0
                        })
                    } else {
                        let DSMatHang = chuoiDSMatHang.split(" ");
                        chuoiLyDo = req.body.chuoiLyDo;
                        let DSLyDo = chuoiLyDo.split("./");
                        DSLyDo.pop();
                        DSMatHang.pop();
                        let DTHTT = await DTHModel.layDTHTiepTheo();
                        // them don tra hang
                        let currentDate = new Date();
                        await DTHModel.themDTH(currentDate, 5);
                        // them chi tiet don tra hang
                        for (let i in DSMatHang) {
                            let matHang = await MatHangModel.layMHTheoMaMH(DSMatHang[i]);
                            let SoLuongTraLai = matHang.recordset[0].SoLuongTraLai;
                            DTHModel.themChiTietDTH(DTHTT.recordset[0].maDTH, DSMatHang[i], SoLuongTraLai, DSLyDo[i]);
                            MatHangModel.capNhatSLTL(DSMatHang[i]);
                        }
                        res.json({
                            status: 1
                        })
                    }
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    hienThiLapYCNhapHang: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            }
            else {
                try {
                    if ((req.query.soLuongTon == null) || (req.query.soLuongTon.trim() == '')) {
                        req.query.soLuongTon = 50;
                    }
                    let soLuongTon = req.query.soLuongTon;
                    let DSMatHang = await MatHangModel.layDSMatHangDuocQLTheoSLTon(req.session.user.MaNV, soLuongTon);
                    DSMatHang = DSMatHang.recordset;
                    res.render("VnvBanHang/lapphieuyeucaunhaphang", {
                        DSMatHang: DSMatHang,
                        soLuongTon: soLuongTon
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    lapYCNhapHang: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            }
            else {
                try {
                    let chuoiSLCN = req.body.chuoiSLCN;
                    let soLuongCanNhap = chuoiSLCN.split(" ");
                    soLuongCanNhap.pop();
                    let soLuongTon = req.body.soLuongTon;
                    let DSMatHang = await MatHangModel.layDSMatHangDuocQLTheoSLTon(req.session.user.MaNV, soLuongTon);
                    DSMatHang = DSMatHang.recordset;
                    for (let i in DSMatHang) {
                        DSMatHang[i].soLuongNhap = parseInt(soLuongCanNhap[i], 10);
                    }
                    // mang danh sach nha cung cap can gui don
                    let DSNCC = [];
                    for (let i in DSMatHang) {
                        if (DSNCC.indexOf(DSMatHang[i].MaNCC) == -1) {
                            DSNCC.push(DSMatHang[i].MaNCC);
                        }
                    }
                    // them yeu cau nhap nhap hang
                    for (let i in DSNCC) {
                        let getID = await donNhapHangModel.themYCNhapHang(req.session.user.MaNV, DSNCC[i]);
                        insertedID = getID.recordset[0].insertedID;
                        // them chi tiet yeu cau don nhap hang nhap hang
                        let tongSoLuong = 0;
                        for (let j in DSMatHang) {
                            if (DSMatHang[j].MaNCC == DSNCC[i]) {
                                tongSoLuong = tongSoLuong + DSMatHang[j].soLuongNhap;
                                await ctDonNhapHangModel.themChiTietDNH(insertedID, DSMatHang[j].MaMH, DSMatHang[j].soLuongNhap);
                                await donNhapHangModel.capNhatSLuongDNH(insertedID, tongSoLuong);
                            }
                        }
                    }
                    // cap nhat trang thai mat hang la dang yeu cau nhap hang
                    for (let i in DSMatHang){
                        await MatHangModel.capNhatTrangThaiMatHang(DSMatHang[i].MaMH);
                    }
                    res.json({
                        status: true
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    hienThiLocComment: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    let DSComment = await commentmathangModel.layCommentChuaPhanLoai();
                    DSComment = DSComment.recordset;
                    res.render("VnvBanHang/loccomment", {
                        DSComment: DSComment
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    phanLoaiCommentTot: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    let stringComment = req.body.stringComment;
                    let DSComment = stringComment.split(' ');
                    DSComment.pop();
                    for (let i in DSComment) {
                        await commentmathangModel.phanLoaiCommentTot(DSComment[i]);
                    }
                    res.json({
                        status: true
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    phanLoaiCommentXau: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    let stringComment = req.body.stringComment;
                    let DSComment = stringComment.split(' ');
                    DSComment.pop();
                    for (let i in DSComment) {
                        await commentmathangModel.phanLoaiCommentXau(DSComment[i]);
                    }
                    res.json({
                        status: true
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    hienThiNganQuyenGopYKH: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    let DSKhacHangDaCMT = await commentkhachhangModel.layKhachHangComment();
                    DSKhacHangDaCMT = DSKhacHangDaCMT.recordset;
                    res.render("VnvBanHang/nganquyengopykhachhang", {
                        DSKhacHangDaCMT: DSKhacHangDaCMT
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    camQuyenComment: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Bán hàng') {
                res.sendStatus(404);
            } else {
                try {
                    let stringKHComment = req.body.stringKHComment;
                    let DSKHComment = stringKHComment.split(' ');
                    DSKHComment.pop();
                    for (let i in DSKHComment) {
                        await commentkhachhangModel.camQuyenComment(DSKHComment[i]);
                    }
                    res.json({
                        status: true
                    })
                } catch (err) {
                    next(err);
                }
            }
        }
    }
}