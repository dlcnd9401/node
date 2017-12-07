var logger = require("./logger");
var config = require("./config");
module.exports = {
    init: (app, router) => {
        for(var i = 0; i < config.route_list.length; i++){
            var curItem = config.route_list[i];
            var curModule = require(curItem.file);
            logger.debug(curItem.type + " 타입 ->> " + curItem.path + " 생성 되었습니다.");

            if(curItem.type == "get"){
                router.route(curItem.path).get(curModule[curItem.method]);
            } else if(curItem.type == "post"){
                router.route(curItem.path).post(curModule[curItem.method]);
            } else if(curItem.type == "all"){
                router.route(curItem.path).all(curModule[curItem.method]);
            } else {
                logger.error("라우터 함수의 타입을 알 수 없습니다. : " + curItem.type);
            }            
        }
        
        app.use("/", router);
    }
};