var today = new Date();
var mTime = today.getTime();
var moodHistory = new observableArray();

var timeFactory = require("~/user-module/timeFactory.js").timeFactory;
var timeFactory = new timeFactory();

for (var i = 6; i > 0; i--) {
    var day = new Date(mTime - (i * 24 * 60 * 60 * 1000));
    moodHistory.push({ dayofmonth: day.getDate(), dayofweek: timeFactory.getWeekDayEn(day.getDay(), true) });
};

var moodPage;

moodHistory.push({ dayofmonth: today.getDate(), dayofweek: timeFactory.getWeekDayEn(today.getDay(), true) });

exports.moodloaded = args => {
    moodPage = args.object;
    moodPage.bindingContext = new observable({
        moodHistory: moodHistory,
        icon: iconPackage
    });
};
exports.ontap = params => {
    console.log("hehe");
    moodHistory.shift();
};
