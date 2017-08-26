/**
 * Attachment附件表
 * @type {[type]}
 */
var Sequelize = require('sequelize');
var Mysql = require('../mysql');

var ArticleAttachment = Mysql.define('articleAttachment', {
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
	isDelete: {
		type: Sequelize.STRING(2),
		defaultValue: "0", //默认值 否
	}, //是否删除
}, {
	freezeTableName: true, // 自定义表名
	tableName: 'ArticleAttachment',
	timestamps: true, // 不要添加时间戳属性 (updatedAt, createdAt)
	// 将createdAt字段改个名
	'createdAt': 'createDate',
	// 将updatedAt字段改个名
	'updatedAt': 'updateDate',
	indexes: [{ // 索引
		type: 'UNIQUE',
		method: 'BTREE',
		unique: true, //唯一
		fields: ['uuid'],
	}],
});

module.exports = ArticleAttachment;