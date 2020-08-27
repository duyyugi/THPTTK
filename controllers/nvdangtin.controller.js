const doiTacModel = require('../models/doitac.model');
const matHangModel = require('../models/mathang.model');
const sanPhamQuangCaoModel = require('../models/sanphamquangcao.model');
const moment = require('moment')

module.exports = {
    hienThiThemSPQC: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Đăng tin') {
                res.sendStatus(404);
            } else {
                try {
                    let rows;
                    if (req.query.searchbox) {
                        if (isNaN(req.query.searchbox)) {
                            rows = await nvdangtinModels.searchProductsLike(req.query.searchbox);
                        }
                        else rows = await nvdangtinModels.searchProducts(req.query.searchbox);
                    }
                    else {
                        rows = await matHangModel.getProducts();

                    }
                    const doitacs = await doiTacModel.getDoiTac();
                    const data = rows.recordset;
                    res.render('Vnvdangtin/formqc', {
                        data,
                        doitacs: doitacs.recordset
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    themSanPhamQC: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Đăng tin') {
                res.sendStatus(404);
            } else {
                try {
                    const arrValue = req.body.sanpham.split(',');
                    arrValue.forEach(async element => {
                        const row = await sanPhamQuangCaoModel.insertSPQC(req.body.MaDoiTac, element);
                        if (row.InsertID < 0) {
                            res.render("<h1>ERROR</h1>");
                        }
                    });
                    res.redirect('/nvdangtin');
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    xemDSQuangCao: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Đăng tin') {
                res.sendStatus(404);
            } else {
                try {
                    const rows = await sanPhamQuangCaoModel.getSPQC();
                    if (rows.recordset.length > 0) {
                        for (let index = 0; index < rows.recordset.length; index++) {
                            rows.recordset[index].NgayDangQC = moment(rows.recordset[index].NgayDangQC).format('DD/MM/YYYY');

                        }
                    }
                    res.render('Vnvdangtin/xemqc', { data: rows.recordset })
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    hienThiNgungQC: async (req, res, next) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Đăng tin') {
                res.sendStatus(404);
            } else {
                try {
                    let rows;
                    if (req.query.searchbox) {
                        if (isNaN(req.query.searchbox)) {
                            res.sendStatus(404);
                        }
                        else rows = await sanPhamQuangCaoModel.searchProductsQC(req.query.searchbox);
                    }
                    else {
                        rows = await sanPhamQuangCaoModel.getProductsQC();

                    }
                    const data = rows.recordset;
                    res.render('Vnvdangtin/ngungqc', {
                        data
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    },
    ngungQC: async (req, res) => {
        if (!req.session.user) {
            res.sendStatus(404);
        } else {
            if (req.session.user.VaiTro != 'NV Đăng tin') {
                res.sendStatus(404);
            } else {
                try {
                    if (req.body.sanpham && req.body.MaDoiTac) {
                        const sanpham = req.body.sanpham.split(',');
                        const MaDoiTac = req.body.MaDoiTac.split(',');
                        for (let index = 0; index < sanpham.length; index++) {
                            await sanPhamQuangCaoModel.removeQC(sanpham[index], MaDoiTac[index]);
                        }
                    }
                    let rows;
                    if (req.query.searchbox) {
                        if (isNaN(req.query.searchbox)) {
                            res.sendStatus(404);
                        }
                        else rows = await sanPhamQuangCaoModel.searchProductsQC(req.query.searchbox);
                    }
                    else {
                        rows = await sanPhamQuangCaoModel.getProductsQC();
    
                    }
                    const data = rows.recordset;
                    res.render('Vnvdangtin/ngungqc', {
                        data
                    });
                } catch (err) {
                    next(err);
                }
            }
        }
    }
}