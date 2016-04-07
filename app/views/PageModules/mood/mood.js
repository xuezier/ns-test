var today = new Date();
var mTime = today.getTime();
var moodHistory = new observableArray();
var moodList = new observableArray();
for (var i = 0; i < 7; i++) {
    moodList.push({ mood: "" });
};
var timeFactory = require("~/user-module/timeFactory.js").timeFactory;
var timeFactory = new timeFactory();

for (var i = 6; i > 0; i--) {
    var day = new Date(mTime - (i * 24 * 60 * 60 * 1000));
    moodHistory.push({ dayofmonth: day.getDate(), dayofweek: timeFactory.getWeekDayEn(day.getDay(), true) });
};

moodHistory.push({ dayofmonth: today.getDate(), dayofweek: timeFactory.getWeekDayEn(today.getDay(), true) });


var moodPage;
exports.moodloaded = args => {
    moodPage = args.object;
    moodPage.bindingContext = new observable({
        moodHistory: moodHistory,
        moodList: moodList,
        MoodHeadViewLeft: DeviceInfo.widthDIPs / 2 - 50,
        icon: iconPackage
    });
    getMoodList();
};
// exports.ontap = params => {
//     moodHistory.shift();
// };


var new_mood;
exports.postMood = params => {
    console.log("wow")
    if (!new_mood) {
        dialogs.alert("Please Choose a Mood First!!").then(function() {
            console.log("Please Choose a Mood First!!");
        });
        return;
    };
    co(function* (params) {
        var response = yield http.request({
            url: "http://192.168.31.175:1314/api/complex/MoodsFactory",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({ Mood: new_mood })
        });
        console.log(JSON.stringify(response));
    });
};

var getMoodList = params => {
    co(function* (params_co) {
        var responseList = yield http.getJSON({
            url: "http://192.168.31.175:1314/api/complex/MoodsFactory",
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        console.log(JSON.stringify(responseList));
        var len = responseList.length;
        for (var i = 0; i < len; i++) {
            var date = new Date(responseList[i].time);
            moodHistory.setItem(i, {
                dayofmonth: date.getDate(),
                dayofweek: timeFactory.getWeekDayEn(date.getDay(), true)
            });
            moodList.setItem(i, {
                mood: String.fromCharCode(responseList[i].Mood)
            });
        };
    }).catch(e => {
        console.log(e);
    });
};

// label tap to get what mood be choosen

exports.moodlabeltap = args => {
    new_mood = "0x" + args.view.text.charCodeAt(0).toString(16);
    moodList.setItem(6, { mood: String.fromCharCode(new_mood) });
    console.log(moodList.toString())
    // console.log(new_mood);
};
