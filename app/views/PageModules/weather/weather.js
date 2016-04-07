var timeFactory = require("~/user-module/timeFactory.js").timeFactory;
timeFactory = new timeFactory();

var geolocation = require("nativescript-geolocation");
var weatherPage;
var weatherInfo;



exports.WeatherLoaded = args => {
    weatherPage = args.object;
    // latitude,longitude
    co(function* () {
        var temp = yield fetch("http://route.showapi.com/9-4?showapi_timestamp=" + timeFactory.getTimeStamp() + "&showapi_appid=5653&showapi_sign=f668fa7e626043b19b34a61743fcf271&needMoreDay=1&needIndex=1&needIndex=1&need3HourForcast=1", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        weatherInfo = JSON.parse(temp._bodyInit).showapi_res_body;
        var weatherDate = {
            f1: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f1.day),
            f2: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f2.day),
            f3: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f3.day),
            f4: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f4.day),
            f5: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f5.day),
            f6: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f6.day),
            f7: timeFactory.getDate("YYYY-MM-DD", weatherInfo.f7.day)
        };
        console.log(weatherDate.f1);
        weatherPage.bindingContext = new observable({
            weatherInfo: new observable(weatherInfo),
            weatherDate: weatherDate
        });
        console.log(weatherInfo.f1.day_air_temperature);
    }).catch(e => {
        console.log(e);
    });
};

var _index;
exports.weatherTap = args => {
    // args.view.animate({
    //     scale: { x: 1, y: args.view.isanimated ? 1 : 1.5 },
    //     duration: 2000
    // });
};

exports.enabled = args => {
    weatherPage.bindingContext.weatherInfo.set({
        cityInfo: {
            c5: "泉州"
        }
    });
    weatherInfo.cityInfo.c5 = "泉州";
    console.log(weatherInfo.cityInfo.c5);
    // if (!geolocation.isEnabled()) {
    //     console.log("disenabled");
    //     geolocation.enableLocationRequest();
    // };
};
exports.get = args => {
    co(function* () {
        var b = yield geolocation.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        });
        console.log(b.longitude);
    }).catch(e => {
        console.log(e);
    })
    // var location = geolocation.getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    //     then(function(loc) {
    //         if (loc) {
    //             model.locations.push(loc);
    //         }
    //     }, function(e) {
    //         console.log("Error: " + e.message);
    //     });
};