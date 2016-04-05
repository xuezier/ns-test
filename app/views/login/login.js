var page;
var LabelModule = require("ui/label");

var layout = require("ui/layouts/stack-layout");
var button = require("ui/button");

var person = new observable({ Name: "jeje" });

var viewFactory = new ViewFactoryBuilder();

var count = 0;

exports.tapme = function(args) {
    var c = count++;
    console.log("taps!");
    person.Name = "taps!" + c;
};
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = person;
    var tapView = page.getViewById("tapView");
    var views = viewFactory.getViewModule(["side", "second"], exports, function(viewports) {
        var items = [];
        viewports.forEach(function(item, index) {
            items.push(new observable({
                title: "tap" + index,
                view: item
            }));
        });
        items[0].title = "tap me";
        tapView.items = items;
        tapView.on("selectedIndexChanged", (aas) => {
            console.log(tapView.items[0].title="hehe"+Math.random());
            tapView._eachChildView(function (v) {
                console.log(v)
            })
        });
        console.log(tapView.on)
        console.log(viewports[0]);
    });
    return page;
};
