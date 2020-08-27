const sql = require('mssql');

module.exports = {
    getDoiTac: _ => sql.query(`select * from DOI_TAC_QC`),
};