var logger = require("./logger");
var db = require("mysql");
var pool = db.createPool(require("./config").jdbc);
// 데이터베이스 관련 로직 설정
module.exports = (sql, paramMap, callback) => {
    pool.getConnection((error, conn) => {
        if(error){
            if(conn){
                conn.release();
            }
            callback(error, null);
            return;
        }

        var exec = conn.query(sql, paramMap, (error, resultMap) => {
            conn.release();
            logger.info("실행된 SQL : " + exec.sql);
            if(error){
                logger.error("SQL문 실행 중 오류 발생");
                callback(error, null);
                return;
            }          
            callback(null, resultMap);
        });
    });
}