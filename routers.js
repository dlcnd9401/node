var service = require("./service");
module.exports = (app, express) => {
    // 라우터 사용 하기.
    var router = express.Router();
    // 라우터를 사용하여 URL 패턴 생성하기.
    router.route("/login").all(service.login);
    router.route("/logout").get(service.logout); 
    router.route("/addUser").all(service.addUser); 
    // 라우터 적용 하기.
    app.use("/", router);
}