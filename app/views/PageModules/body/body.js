var bodyPage;
var items = new observableArray();
for (var loop = 0; loop < 20; loop++) {
    items.push("Item " + loop.toString());
}
exports.bodyLoaded = args => {
    bodyPage = args.object;
    bodyPage.bindingContext = new observable({
        items: ["none", "little ", "very", "sharp pain"],
        info: {
            Start: "2016/03/23",
            Period: "3",
            End: "2016/04/20",
            Cycle: "28"
        },
        selectedIndex: 3
    });
};