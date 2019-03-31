const express = require("express");
const mysql = require('mysql')
const bodyParser = require('body-parser')
const dbConfig = require('./db/config');
const userSQL = require('./db/instr');
const app = express();
const Routes = express.Router();

var connection = mysql.createConnection(dbConfig.mysql)
connection.connect();

function getList(res) {

    connection.query(userSQL.reSpiderSQL.getList2, function (error, results, fields) {
        if (error) throw error;
        // results.forEach(element => {
        //     element.url= element.url.split(',')[0]
        // });

        res.send({
            data: results,
            code: '1',
            msg: "ok"
        })
    });

}

function insert(obj, res) {
    if (obj.title !== "" && obj.des !== "") {
        connection.query(userSQL.reSpiderSQL.insert2, obj, function (error, results, fields) {
            if (error) throw error;
            res.send({
                code: 1,
                success: "ok",
                id: results.insertId
            })
        });
    } else {
        res.send({
            code: 0,
            success: "标题和描述不能为空！",
        })
    }

}

function delItem(obj, res) {
    if (obj.id !== "") {
        connection.query(userSQL.reSpiderSQL.delete, obj.id, function (error, results, fields) {
            if (error) throw error;
            res.send({
                code: 1,
                success: "ok"
            })
        });
    } else {
        res.send({
            code: 0,
            success: "id不能为空！",
        })
    }

}

function getItem(obj, res) {
    if (obj.id !== "") {
        var arr=[];
        arr.push(obj.title);
        arr.push(obj.des);
        arr.push(obj.id);
        connection.query(userSQL.reSpiderSQL.updateItem, arr, function (error, results, fields) {
            if (error) throw error;
            // console.log(results)
            res.send(results[0])
        });
    } else {
        res.send({
            code: 0,
            success: "id不能为空！",
        })
    }

}
Routes.get('/list', function (req, res) {
    getList(res)
})
Routes.post('/list', function (req, res) {
    var obj = req.body;
    insert(obj, res)
})
Routes.delete('/list/:id', function (req, res) {
    delItem(req.params, res)
})
Routes.put('/list/:id', function (req, res) {
    // console.log(req.body)
    var obj=req.body;
    obj.id=req.params.id;
    getItem(obj, res)

})

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', Routes)
app.use('/', express.static(__dirname + '/src'));
const server=app.listen(3000,function(){
    var host = server.address().address
    var port = server.address().port
    // console.log(host)
    // console.log(port)
    console.log("应用实例，访问地址为 http://127.0.0.1:"+port) 
})