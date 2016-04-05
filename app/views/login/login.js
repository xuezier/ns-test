var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

var loader = new LoadingIndicator();

var options = {
    message: 'Loading...',
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: false,
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    }
};

// Do whatever it is you want to do while the loader is showing, then
// loader.show(options);
exports.loaded = function(args) {
    var page = args.object;
    var v = page.getViewById("mainButton");

};
exports.jump = function(argument) {
    loader.show(options);
    setTimeout(function() {
        console.log("hehe");
        loader.hide();
        frame.topmost().navigate({
            moduleName: "views/main/main",
            animated: true,
            clearHistory: true,
            transition: {
                name: "slideLeft",
                duration: 380,
                curve: "easeIn"
            }
        })
    }, 3000);
};