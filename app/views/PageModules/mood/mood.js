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
        MoodHeadViewLeft: DeviceInfo.widthDIPs / 2 - 50,
        icon: iconPackage
    });
};
exports.ontap = params => {
    moodHistory.shift();
};

// label tap to get what mood be choosen
exports.moodlabeltap = args => {
    var mood = "0x" + args.view.text.charCodeAt(0).toString(16);
    console.log(mood);
};
