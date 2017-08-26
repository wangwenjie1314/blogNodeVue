/**
 * User 用户表
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var Mysql = require('./mysql');

var User = Mysql.define('user', {
	uuid: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,
	}, //uuid
	email: { //邮箱
		type: Sequelize.STRING,
		allowNull: false,
		unique: true, //唯一
		validate: {
			isEmail: true,// 检测邮箱格式 (foo@bar.com)
		},
	},
	password: { //密码
		type: Sequelize.STRING,
		allowNull: false,
	},
	state: { //状态 0未激活邮箱、1已激活邮箱
		type: Sequelize.STRING(2),
		defaultValue: "0", //默认值
	},
}, {
	freezeTableName: true, // 自定义表名
	tableName: 'User',
	timestamps: true, // 不要添加时间戳属性 (updatedAt, createdAt)
	// 将createdAt字段改个名
	'createdAt': 'createDate',
	// 将updatedAt字段改个名
	'updatedAt': 'updateDate',
	indexes: [{ // 索引
		// name: 'User_uuid',//默认为模型名 + '_' + 字段名
		type: 'UNIQUE', //UNIQUE、 FULLTEXT 或 SPATIAL之一
		method: 'BTREE', //BTREE 或 HASH
		unique: true, //唯一 //设置索引是否唯一，设置后会自动触发UNIQUE设置//true:索引列的所有值都只能出现一次，即必须唯一
		fields: ['uuid'], //建立索引的字段数组。每个字段可以是一个字段名，sequelize 对象 (如 sequelize.fn)，或一个包含：attribute (字段名)、length (创建前缀字符数)、order (列排序方向)、collate (较验的字段集合 (排序))
	}],
	comment:"User Table",//描述
});

module.exports = User;