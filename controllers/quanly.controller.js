let nhanVienModel = require('../models/nhanvien.model');
let bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);

module.exports = {
    postDangKyNhanVien: async (req, res, next) => {
        try {
            res.render("VquanLy/dangKy");
        } catch (err) {
            next(err);
        }
    },
    getDangKyNhanVien: async (req, res, next) => {
        try {
            let status = 1;
            let nhanVien = await nhanVienModel.layNVTheoTen(req.body.username);
            if (nhanVien.rowsAffected[0] == 1) {
                // username is not available
                status = 1;
            } else if (req.body.passRegister != req.body.repPassRegister) {
                // Password and repPassword not match
                status = 2;
            } else {
                hasedPassword = bcrypt.hashSync(req.body.passRegister, salt);
                console.log(hasedPassword);
                let nhanVienMoi = {
                    name: req.body.name,
                    role: req.body.role,
                    username: req.body.username,
                    password: hasedPassword
                }
                await nhanVienModel.themNV(nhanVienMoi);
                // Register Successful
                status = 3;
            }
            res.render("VquanLy/dangKy", {
                status: status
            });
        } catch (err) {
            next(err);
        }
    }
}
