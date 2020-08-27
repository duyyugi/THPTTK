const sql = require('mssql');

module.exports = {
    layKhachHangComment:()=>{
        return sql.query`select* from KH_COMMENT where BiCamCmt = 0`;
    },
    camQuyenComment:(Email)=>{
        return sql.query`update KH_COMMENT set BiCamCmt = 1 where Email = ${Email}`;
    }
}