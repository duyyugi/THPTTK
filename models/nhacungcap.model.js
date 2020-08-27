const sql = require('mssql');

module.exports = {
    layTatCaNCC : () => {
        return sql.query`select* from NHA_CUNG_CAP`;
    },
    layNCCTheoMa : (maNCC) => {
        return sql.query`select* from NHA_CUNG_CAP where MaNCC=${maNCC}`;
    },
}