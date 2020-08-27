const sql = require('mssql');

module.exports = {
    layCommentChuaPhanLoai: () => {
        return sql.query`select a.*,b.TenMH from COMMENT_MH as a, MAT_HANG as b where a.LoaiComment is null and b.MaMH = a.MaMH;`;
    },
    phanLoaiCommentTot:(maCMT)=>{
        return sql.query`update COMMENT_MH set LoaiComment = 1 where MaCMT = ${maCMT}`
    },
    phanLoaiCommentXau:(maCMT)=>{
        return sql.query`update COMMENT_MH set LoaiComment = 0 where MaCMT = ${maCMT}`
    }
}