/**
 * 数据库表关系建立
 */
var Mysql = require('./mysql');

//表
var AdminUser = require('./adminUser');//管理员表
var User = require('./user');//用户表
var UserInfo = require('./userInfo');//用户信息表
var Article = require('./article');//文章表
var Category = require('./category');//文章类别表
var Attachment = require('./attachment');//文章附件表

/**
 * 关系建立
 */

//用户-用户资料
User.hasOne(UserInfo); //1:1

//用户-文章
User.hasMany(Article); //1:N
Article.belongsTo(User); //1:1

//文章-分类
Article.belongsToMany(Category,{through: 'ArticleCategory'}); //N:N
Category.belongsToMany(Article,{through: 'ArticleCategory'}); //N:N

//文章-附件
Article.hasMany(Attachment); //1:N
Attachment.belongsTo(Article); //1:1

//基于sequelize自动创建表
Mysql.sync({
	force: true,//是否清空数据库表
}).then(function() {
	console.log('ok');
});

module.exports = {
	AdminUser: AdminUser,
	User: User,
	UserInfo: UserInfo,
	Article: Article,
	Category: Category,
	Attachment: Attachment,
};