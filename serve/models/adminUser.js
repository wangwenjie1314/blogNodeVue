/**
 * AdminUser管理员
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var Mysql = require('./mysql');

var AdminUser = Mysql.define('adminUser', {
	uuid: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,//Sequelize.UUIDV4
	}, //uuid
	userName: { //管理员账号
		type: Sequelize.STRING,
		allowNull: false, //是否允许为空
		unique: true, //唯一
	},
	password: { //管理员密码
		type: Sequelize.STRING,
		allowNull: false,
	},
	role: { //角色 1超级管理员、2普通管理员
		type: Sequelize.STRING(2),
		defaultValue: "1",
	},
}, {
	freezeTableName: true, // 自定义表名
	tableName: 'AdminUser',
	timestamps: true, // 添加时间戳属性 (updatedAt, createdAt)
	createdAt: 'createDate',// 将createdAt字段改个名
	updatedAt: 'updateDate',// 将updatedAt字段改个名
	indexes: [{ // 索引
		type: 'UNIQUE',
		method: 'BTREE',
		unique: true, //唯一
		fields: ['uuid'],
	}],
});

module.exports = AdminUser;