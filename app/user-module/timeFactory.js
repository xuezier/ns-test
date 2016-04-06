exports.timeFactory = function(time) {
    time ? (this.Date = new Date()) : (this.Date = new Date());
    this.getWeekDayEn = (day, isEn) => {
        (typeof day === "number") ? true : day = 7;
        var dayArray;
        isEn ? dayArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "0"] : dayArray = ["日", "一", "二", "三", "四", "五", "六", "0"];
        return dayArray[day];
    };
};