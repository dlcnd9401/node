var logger = require("./logger");
var dao = require("./db");
var sql = require("./sql");

module.exports.login = (req, res) => {
    if(req.session.user){
        logger.debug("이미 로그인 되어 있습니다.");
        res.render("main", {data : req.session.user});
    } else {
        if(req.method == "GET"){
            res.render("login");
        } else if(req.method == "POST"){
            dao(sql.loginUser, [req.body.email, req.body.pw], (error, resultMap) => {
                if(error){
                    res.render("result");
                    return;
                }

                if(resultMap.length > 0){
                    logger.debug(resultMap[0]);
                    req.session.user = resultMap[0];
                    res.render("main", {data : resultMap[0]});
                } else {
                    res.render("addUser");
                }
            });
        } else {
            res.render("404");
        }
    }
};

module.exports.logout = (req, res) => {
    if(req.session.user){
        logger.debug("세션 삭제 : 로그아웃");
        req.session.destroy(error => {
            if(error){
                logger.error("세션 삭제 중 오류 발생.");
                return;
            }
            logger.debug("로그아웃 완료!");
            res.redirect("/login");
        });
    }
};

module.exports.addUser = (req, res) => {
    if(req.method == "GET"){
        res.render("addUser");
    } else if(req.method == "POST"){
        dao(sql.addUser, req.body, (error, resultMap) => {
            if(error){
                res.render("result");
                return;
            }

            if(resultMap){
                console.dir(resultMap);
                res.render("login");
            } else {
                res.render("addUser");
            }
        });
    } else {
        res.render("404");
    }
};
