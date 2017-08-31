/**
 * UserInfo用户信息表
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var Mysql = require('./mysql');

var UserInfo = Mysql.define('userInfo', {
	uuid: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
	}, //uuid
	nikeName: Sequelize.STRING, //昵称
	birth: Sequelize.DATE, //出生日期
	sex: { //性别 1男 2女 0未知
		type: Sequelize.STRING(2),
		defaultValue: "1", //默认值
	},
	face: Sequelize.STRING, //头像
	city: Sequelize.STRING, //所在城市
	address: Sequelize.STRING, //住址
}, {
	freezeTableName: true, // 自定义表名
	tableName: 'UserInfo',
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

module.exports = UserInfo;