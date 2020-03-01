/**
 * 账单API router
 * add by wwj
 * 2016-12-22 17:45:53
 */
var express = require('express');
var router = express.Router();

var adminDao = require('../controllers/admin');
var checkAdminToken = require('../middlewares/check').checkAdminToken; //检验管理员token

/**
 * 登录
 */
router.post('/login', function(req, res, next) {
	adminDao.login(req, res, next);
});

/**
 * 登出
 */
router.get('/logout', checkAdminToken, function(req, res, next) {
	adminDao.logout(req, res, next);
});

/**
 * 更新token 防止token过期
 */
router.put('/token', function(req, res, next) {
	adminDao.updateAccessToken(req, res, next);
});

/**
 * 新增管理员
 */
router.post('/create',checkAdminToken, function(req, res, next) {
	adminDao.createAdminUser(req, res, next);
});

/**
 * 管理员列表
 */
router.get('/list', checkAdminToken, function(req, res, next) {
	adminDao.getAdminUserList(req, res, next);
});

module.exports = router;