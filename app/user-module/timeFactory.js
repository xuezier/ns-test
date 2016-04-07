exports.timeFactory = function(time) {
    time ? (this.Date = new Date()) : (this.Date = new Date());
    this.getWeekDayEn = (day, isEn) => {
        (typeof day === "number") ? true : day = 7;
        var dayArray;
        isEn ? dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "0"] : dayArray = ["日", "一", "二", "三", "四", "五", "六", "0"];
        return dayArray[day];
    };
    this.getTimeStamp = stamp => {
        var date;
        (typeof stamp === "number") ? date = new Date(stamp) : date = new Date();
        return date.getFullYear() + ""
            + ((date.getMonth() < 9) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + ""
            + ((date.getDate() < 10) ? ("0" + date.getDate()) : date.getDate()) + ""
            + ((date.getHours() < 10) ? ("0" + date.getHours()) : date.getHours()) + ""
            + ((date.getMinutes() < 10) ? ("0" + date.getMinutes()) : date.getMinutes()) + ""
            + ((date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds());
    };
    this.getDate = (format, needFormatDate) => {
        var date;
        needFormatDate ? (((needFormatDate + "").length == 8) ? date = new Date(needFormatDate.substr(0, 4) + "-" + needFormatDate.substr(4, 2) + "-" + needFormatDate.substr(6, 2)) : date = new Date(needFormatDate)) : date = new Date();
        var o = {
            "M+": date.getMonth() + 1, //month 
            "D+": date.getDate(), //day 
            "h+": date.getHours(), //hour 
            "m+": date.getMinutes(), //minute 
            "s+": date.getSeconds(), //second 
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter 
            "S": date.getMilliseconds() //millisecond 
        }

        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
};