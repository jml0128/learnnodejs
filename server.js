var express = require('express');
var app = express();
var mysql = require('mysql');
var contactDB = require('./contactDB');



var connection = mysql.createConnection(contactDB.db);
connection.connect();


//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});




app.get('/getGoods', function (req, res) {
	var arr = [];
	connection.query('SELECT `id`,`name`,`desc`,`price` from `goods` where `sale` = 1 and `stock` > 0', function (err, results, fields) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			arr[i] = results[i];
		}
		res.send(arr);
	});
});

app.get('/getGoods/:category', function (req, res) {
	var arr = [];
	connection.query('SELECT `id`,`name`,`desc`,`price` from `goods` where `sale` = 1 and `stock` > 0 and `category` = ' + req.params.category, function (err, results, fields) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			arr[i] = results[i];
		}
		res.send(arr);
	});
});

app.get('/getGoodsInfo/:id', function (req, res) {
	var arr = [];
	connection.query('SELECT `id`,`name`,`desc`,`price`,`sale`,`stock` from `goods` where `id` = ' + req.params.id, function (err, results, fields) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			arr[i] = results[i];
		}
		res.send(arr);
	});
});

app.get('/getGoodsProperty/:id', function (req, res) {
	var arr = [];
	connection.query('SELECT * from `goods_property` where `goods_id` = ' + req.params.id, function (err, results, fields) {
		if (err) throw err;
		for (var i = 0; i < results.length; i++) {
			arr[i] = results[i];
		}
		res.send(arr);
	});
});


app.listen(3000);