// Supervisor 설치 : npm install -g supervisor
// app 실행 : supervisor app.js
// 필요한 모듈 가져오기.
var logger = require("./logger");
var express = require("express");
var expressErrorHandler = require("express-error-handler");
var static = require("serve-static");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");
var config = require("./config");

// 서버 설정 하기.
var app = express();
app.set("port", config.server_port);
app.use(static(path.join(__dirname, "resources")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//app.engine("html", require("ejs").renderFile);
app.use(session(config.server_session));

// 라우터 적용
require("./router_load").init(app, express.Router());

// 서버 시작 하기.
var server = app.listen(app.get("port"), () => {
    logger.info("서버 시작 : http://127.0.0.1:" + app.get("port"));
});

// 예외처리 설정 할기.
var errorHandler = expressErrorHandler(config.server_error);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);