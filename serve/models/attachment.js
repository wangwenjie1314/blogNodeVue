/**
 * Attachment附件表
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var Mysql = require('./mysql');

var Attachment = Mysql.define('attachment', {
	uuid: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV1,//Sequelize.UUIDV4
	}, //uuid
	name: Sequelize.STRING, //附件名字
	relativeUrl: Sequelize.STRING, //附件相对地址
	absoluteUrl: Sequelize.STRING, //附件绝对地址
	type: Sequelize.STRING(2), //附件类型（1图片、2视频、3音频、4其他文件）
}, {
	freezeTableName: true, // 自定义表名
	tableName: 'Attachment',
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

module.exports = Attachment;