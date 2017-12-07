module.exports = {
    server_port: 80,
    server_session: {
        secret:"my key",
        resave:true,
        saveUninitialized:true
    },
    server_error: {
        views: {
            "404":"404"
        }
    },
    jdbc: {
        connectionLimit:1,
        host:"gudi.kr",
        user:"gdj7",
        password:"1234",
        database:"gdj7",
        debug:false
    },
    route_list: [
        {path:"/login",   type:"all", file:"./service", method:"login"},
        {path:"/logout",  type:"get", file:"./service", method:"logout"},
        {path:"/addUser", type:"all", file:"./service", method:"addUser"}
    ]
};