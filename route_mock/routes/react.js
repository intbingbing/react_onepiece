var express = require('express');
const uuidv1 = require('uuid/v1');
let path = require('path');
let fs = require('fs');
var router = express.Router();

router.post('/auth', function(req, res) {
    let [user, pass] = [req.body.user, req.body.pass];
    if(user === 'admin'&& pass === 'admin'){
        return res.send({code:'200110', msg:'auth success', data:{'token':uuidv1()}});
    }
    return res.send({code:'400110', msg:'auth failed'});
});

router.use(function(req, res, next) {
    if(!req.get('token')){
        return res.send({code:'400120', msg:'no token'});
    }
    next();
});

router.get('/echarts_k_line', function(req, res) {
    fs.readFile(path.join(__dirname,'../mock_data/echarts_k_line.json'), 'utf-8', function (err,data) {
        if(err) {
            return res.status(500).json({
                "code": -1,
                "message": "error",
                "data": err
            })
        }
        data = data.replace(/\r\n/g,"");
        data = data.replace(/\s/g,"");
        return res.json({
            "code": 0,
            "message": "success",
            "data": JSON.parse(data)
        })
    });
});

router.get('/', function(req, res, next) {
    return res.send({msg:'HI!React API!'});
});

module.exports = router;
