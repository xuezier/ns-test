var page;
var LabelModule = require("ui/label");

var layout = require("ui/layouts/stack-layout");
var button = require("ui/button");


var viewFactory = new ViewFactoryBuilder();



exports.loaded = function(args) {
    page = args.object;

    page.bindingContext = new observable({
        page: page,
        icon: iconPackage,
    });

    var tapView = page.getViewById("tapView");
    var views = viewFactory.getViewModule(["mood", "body", "weather"], exports, function(viewports) {
        var items = [];
        viewports.forEach(function(item, index) {
            items.push(new observable({
                title: "tap",
                view: item
            }));
        });
        items[0].title = "Moods";
        items[1].title = "Health";
        items[2].title = "Weather";
        tapView.items = items;
        // tapView.selectedIndex = 2;
        tapView.on("selectedIndexChanged", (aas) => {
            tapView._eachChildView(function(v) {
                console.log(v)
            })
        });
    });

    return page;
};
