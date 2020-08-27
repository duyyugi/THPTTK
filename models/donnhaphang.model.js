const sql = require('mssql');

module.exports = {
    themYCNhapHang: (maNVLap, maNCC) => {
        return sql.query`insert into DON_NHAP_HANG values(${maNVLap},0,${maNCC},N'Chờ duyệt',GETDATE(),NULL,NULL);select @@identity as insertedID`;
    },
    capNhatSLuongDNH:(MaDonNhap,SoLuong)=>{
        return sql.query`update DON_NHAP_HANG set SoLuong=${SoLuong} where MaDonNhap = ${MaDonNhap}`
    }
}