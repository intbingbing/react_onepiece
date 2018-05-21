let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

//let index = require('./routes/index');
let react = require('./routes/react');

let route = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
route.use(logger(':method :url :status :remote-addr - :date[web]'));
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));
route.use(cookieParser());
route.use(express.static(path.join(__dirname, 'public')));
route.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials","true");  //服务端允许携带cookie
    res.header("Access-Control-Allow-Origin", req.headers.origin);  //允许的访问域
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Token");  //访问头
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  //访问方法
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Max-Age", 86400);
        res.sendStatus(204); //让options请求快速返回.
    }
    else {
        next();
    }
});
//route.use('/', index);
route.use('/react', react);
// catch 404 and forward to error handler
route.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

route.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = route;