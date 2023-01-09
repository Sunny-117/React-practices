create database SelfDesign;

use SelfDesign;

create table user(
	account varchar(20) primary key,
	pwd varchar(50),
	username varchar(20),
	vip int
);

create table project(
	id int primary key auto_increment,
	projectName varchar(20),
	account varchar(20),
	content text,
	createTime long,
	modifyTime long,
	isRelease boolean
) auto_increment=10001;
