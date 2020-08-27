const sql = require('mssql');

module.exports = {
    layThongTinHD: (maHD,TrangThaiHD) => {
        if (maHD == null) {
            if (TrangThaiHD == "chuathanhtoan") {
                return sql.query`select* from HOA_DON where TrangThaiHD= N'Chưa thanh toán'`;
            } else {
                return sql.query`select* from HOA_DON where TrangThaiHD= N'Đã thanh toán'`;
            }
        } else {
            if (TrangThaiHD == "chuathanhtoan") {
                return sql.query`select* from HOA_DON where TrangThaiHD= N'Chưa thanh toán' and MaHD=${maHD}`;
            } else {
                return sql.query`select* from HOA_DON where TrangThaiHD= N'Đã thanh toán' and MaHD=${maHD}`;
            }
        }
    },
    layTTLienQuan: (maHD) => {
        return sql.query`select e.*,f.HinhThucThanhToan as cachTTThe from (select a.*, b.TenKH, c.TenNV as NVGH, d.TenNV as NVBH 
            from HOA_DON as a,KHACH_HANG as b, NHAN_VIEN as c, NHAN_VIEN as d
            where a.MaKH = b.MaKH and a.NVGiaoHang= c.MaNV and a.NVBanHang = d.MaNV and a.MaHD=${maHD}) as e LEFT JOIN
            (select* from HOA_DON_TT_THE) as f on e.MaHD=f.MaHD;`;
    },
    xacNhanHoaDon: (maHD, cachthucTT) => {
        return sql.query`update HOA_DON set TrangThaiHD = N'Đã thanh toán',HinhThucThanhToan=${cachthucTT} where MaHD=${maHD}`;
    },
}