var bodyPage;
var items = new observableArray();
for (var loop = 0; loop < 20; loop++) {
    items.push("Item " + loop.toString());
}
exports.bodyLoaded = args => {
    bodyPage = args.object;
    bodyPage.bindingContext = new observable({
        items: ["无", "轻微", "绞痛", "剧痛"],
        info: {
            Start: "2016/03/23",
            Period: "3",
            End: "2016/04/20",
            Cycle: "28"
        },
        selectedIndex: 3
    });
};