const sql = require('mssql');

module.exports = {
    themDTH: (date,nvLap) => {
        return sql.query`insert into DON_TRA_HANG values(${date},${nvLap})`;
    },
    layDTHTiepTheo: () => {
        return sql.query`select max(MaDonTra)+1 as maDTH from DON_TRA_HANG`;
    },
    themChiTietDTH: (maDT,maMH,soLuong,lyDo)=>{
        return sql.query`insert into CHI_TIET_DTH values(${maDT},${maMH},${soLuong},${lyDo})`;
    }
}