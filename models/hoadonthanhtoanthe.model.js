const sql = require('mssql');

module.exports = {
    lapHoaDonThanhToanThe : (maHD,cachTTThe,maGD)=>{
        return sql.query`insert into HOA_DON_TT_THE values(${maHD},${cachTTThe},${maGD})`;
    }
}