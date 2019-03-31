/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 100138
Source Host           : localhost:3306
Source Database       : murl

Target Server Type    : MYSQL
Target Server Version : 100138
File Encoding         : 65001

Date: 2019-03-31 22:23:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for backbone
-- ----------------------------
DROP TABLE IF EXISTS `backbone`;
CREATE TABLE `backbone` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `des` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of backbone
-- ----------------------------
INSERT INTO `backbone` VALUES ('1', '第一条标题', '第一条描述');
