const sql = require('mssql');

module.exports = {
    layNVTheoTen : (username) => {
        return sql.query`select* from NHAN_VIEN where username = ${username}`;
    },
    themNV : (nhanVien) => {
        return sql.query`insert into NHAN_VIEN values(${nhanVien.name},${nhanVien.role},${nhanVien.username},${nhanVien.password})`;
    }
}