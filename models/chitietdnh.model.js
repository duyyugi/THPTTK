const sql = require('mssql');

module.exports = {
    themChiTietDNH: (maDonNhap, MaMH, SoLuong) => {
        return sql.query`insert into CHI_TIET_DNH values(${maDonNhap},${MaMH},${SoLuong})`;
    },
}