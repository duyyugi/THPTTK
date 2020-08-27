const sql = require('mssql');

module.exports = {
    insertSPQC: (maDT,maMH) => sql.query(`INSERT INTO DTQC_MH VALUES(${maDT},${maMH},GETDATE())`),
    getSPQC: _ => sql.query(`SELECT * FROM DTQC_MH`),
    getProductsQC: _ => sql.query(`select * from DTQC_MH`),
    searchProductsQC: key => sql.query(`select * from DTQC_MH
    where MaMH = '${key}'`),
    removeQC: (MaMH,MaDT) => sql.query(`DELETE FROM DTQC_MH WHERE MaMH = ${MaMH} and MaDT = ${MaDT}`),
};