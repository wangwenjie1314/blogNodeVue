/**
 * 数据库表
 * add by wwj
 * 2017-01-18 23:08:28
 * 默认表名（一般这里写单数），生成时会自动转换成复数形式
 * 这个值还会作为访问模型相关的模型时的属性名，所以建议用小写形式
 * 字段定义（主键、created_at、updated_at默认包含，不用特殊定义）
 */
var Mysql = require('./mysql');

//表
var AdminUser = require('./adminUser');//管理员表
var User = require('./user');//用户表
var UserInfo = require('./userInfo');//用户信息表
var Article = require('./article');//文章表
var ArticleCategory = require('./articleCategory');//文章类别表
var ArticleAttachment = require('./articleAttachment');//文章附件表

/**
 * 关系建立
 */

//用户-用户资料
User.hasOne(UserInfo); //1:1

//用户-文章
User.hasMany(Article); //1:N
Article.belongsTo(User); //1:1

//文章-分类
Article.hasMany(ArticleCategory); //1:N
ArticleCategory.belongsTo(Article); //1:1

//文章-附件
Article.hasMany(ArticleAttachment); //1:N
ArticleAttachment.belongsTo(Article); //1:1

//基于sequelize自动创建表
// Mysql.sync({
// 	force: true,//是否清空数据库表
// }).then(function() {
// 	console.log('ok');
// });

module.exports = {
	AdminUser: AdminUser,
	User: User,
	UserInfo: UserInfo,
	Article: Article,
	ArticleCategory: ArticleCategory,
	ArticleAttachment: ArticleAttachment,
};