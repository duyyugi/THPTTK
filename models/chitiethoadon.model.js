const sql = require('mssql');

module.exports = {
    layCTHDtheoMa: (maHD)=>{
        return sql.query`select a.*, b.TenMH, b.DonGia from CHI_TIET_DON_HANG as a, MAT_HANG as b where a.MaMH = b.MaMH and a.MaHD = ${maHD}`;
    }
}