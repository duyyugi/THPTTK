const sql = require('mssql');

module.exports = {
    layHangBiTraTheoSL: (SoLuongTraLai, maNV, maNCC) => {
        return sql.query`select a.*, b.TenNCC from MAT_HANG as a,NHA_CUNG_CAP as b 
        where a.SoLuongTraLai >= ${SoLuongTraLai}  and a.NVQL = ${maNV} and a.MaNCC = b.MaNCC and b.MaNCC = ${maNCC};`;
    },
    capNhatSLTL: (maMH) => {
        return sql.query`update MAT_HANG set SoLuongTraLai = 0 where MaMH = ${maMH}`;
    },
    layMHTheoMaMH: (maMH) => {
        return sql.query`select* from MAT_HANG where MaMH=${maMH}`;
    },
    layDSMatHangDuocQLTheoSLTon : (maNVQL,SoLuongTon)=>{
        return sql.query`select a.*,b.TenNCC from MAT_HANG as a,NHA_CUNG_CAP as b where NVQL=${maNVQL} and SoLuongTon <= ${SoLuongTon} and a.MaNCC = b.MaNCC and a.TrangThai = 0`;
    },
    capNhatTrangThaiMatHang : (maMH)=>{
        return sql.query`update MAT_HANG set TrangThai = 1 where MaMH = ${maMH}`;
    },
    // Doan
    getProducts: () => {
        return sql.query(`select * from MAT_HANG
        where MaMH not in (select MaMH from DTQC_MH)`);
    },
    searchProducts: (key) => {
        sql.query(`select * from MAT_HANG
        where (MaMH = '${key}' or TenMH like '%${key}%') and MaMH not in (select MaMH from DTQC_MH)`);
    },
    searchProductsLike: (key) => {
        sql.query(`select * from MAT_HANG
        where TenMH like '%${key}%' and MaMH not in (select MaMH from DTQC_MH)`);
    }
}