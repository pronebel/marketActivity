// var app = getApp();
//md5
var md5 = require("./md5.js");

function formatTime(date, type) {
    var date = new Date(date);
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    if (type == "day") {
        return [year, month, day].map(formatNumber).join('/')
    } else if (type == "time") {
        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function signByMd5(param, privatekey) {
    var paramArry = new Array();
    for (var value in param) {
        paramArry.push(param[value]);
    }
    var str = paramArry.join("") + privatekey;
    var md5Sign = md5(str).toUpperCase();
    return md5Sign;
}

function getSystemInfo() {
    var res = wx.getSystemInfoSync();
    return res;
}

function unique(data) {
    var res = [];
    var json = {};
    for (var i = 0; i < data.length; i++) {
        if (!json[data[i]]) {
            res.push(data[i]);
            json[data[i]] = 1;
        }
    }
    return res;
}

export { formatTime, signByMd5, getSystemInfo, unique };
