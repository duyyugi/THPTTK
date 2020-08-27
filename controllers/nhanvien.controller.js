let nhanVienModel = require('../models/nhanvien.model');
let bcrypt = require('bcryptjs');

module.exports = {
    getLogin: (req, res) => {
        res.render("login");
    },
    postLogin: async (req, res, next) => {
        try {
            let nhanVien = await nhanVienModel.layNVTheoTen(req.body.username);
            let status = 1;
            if (nhanVien.recordset.length == 0) {
                // username don't exist in db
                status = 1;
            } else {
                let comparePassword = await bcrypt.compare(req.body.passLogin, nhanVien.recordset[0].password);
                if (comparePassword) {
                    // Password is correct, Login successful
                    status = nhanVien.recordset[0];
                } else {
                    // Password isn't correct
                    status = 3;
                }
            }
            if (status == 1 || status == 3) {
                res.render("login", {
                    status: status
                });
            } else {
                req.session.user = status;
                res.locals.isLoggedIn = true;
                res.locals.username = req.session.user.username;
                if (req.session.user.VaiTro == "Quản lý") {
                    res.redirect('/quanly');
                } else if (req.session.user.VaiTro == "NV Đăng tin") {
                    res.redirect('/nvdangtin');
                } else if (req.session.user.VaiTro == "Thủ quỹ") {
                    res.redirect('/thuquy');
                } else {
                    res.redirect('/nvbanhang');
                }
            }
        } catch (err) {
            next(err);
        }
    },
    getLogout: async (req, res) => {
        try {
            req.session.destroy()
            return res.redirect('/')
        } catch (err) {
            next(err);
        }
    },
}