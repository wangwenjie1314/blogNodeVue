/**
 * 数据库-封装
 * 基于mysql
 * 使用Sequelize
http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001471955049232be7492e76f514d45a2180e2c224eb7a6000
 */
var config = require('config-lite');
var Sequelize = require('sequelize');

var Mysql = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
	host: config.mysql.host, //数据库服务器ip
	dialect: 'mysql', //数据库使用mysql
	port: 3306, //数据库服务器端口
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

module.exports = Mysql;