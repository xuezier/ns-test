var app = require("application");

// 创建路由函数，从外部引入文件
var builder = require("ui/builder");
var _base_view_path = "~/views/PageModules/";
global.importViewModule = function(moduleName, teleporter, outExports, option) {
    if (typeof teleporter === 'object') {
        // if outExports is exist and is a function, set option as outExports
        (outExports && (typeof outExports == 'object')) ? true: (option = outExports, outExports = {});
        var _ModulePath = _base_view_path + moduleName;
        var _ViewModule = builder.load({ path: _ModulePath, name: moduleName, exports: outExports });
        teleporter.removeChildren();
        teleporter.addChild(_ViewModule);
    };
    (option && (typeof option == "function")) ? option(_ViewModule): false;
};

// 创建路由对象，从外部引入文件并保存到viewport中
global.ViewFactoryBuilder = function(moduleName, outExports, option) {
    try {

        this._ViewModule = {};
        this._ViewModules = [];
        this.getViewModule = function(moduleName, outExports, option) {
            // if outExports is exist and is a function, set option as outExports
            (outExports && (typeof outExports == 'object')) ? true: (option = outExports, outExports = {});
            // change moduleName for Array
            (typeof moduleName === "object") ? true: (moduleName = [moduleName]);
            // iterate through the array[moduleName] to load view 
            // clear this._ViewModules
            var _ViewModules = [];
            moduleName.forEach(function(item, index) {
                // moduleName[index] = "~/views/PageModules/" + item;
                _ViewModules.push(builder.load({
                    path: "~/views/PageModules/" + item,
                    name: item,
                    exports: outExports
                }));
            });
            this._ViewModules = _ViewModules;
            (option && (typeof option == "function")) ? option(this._ViewModules): false;
            return this._ViewModules;
        };
        moduleName ? this.getViewModule(moduleName, outExports, option) : false;
    } catch (e) {
        console.log("error", e);
    };
};

// global module defined
global.co = require("co");
global.observable = require("data/observable").Observable;
global.observableArray = require("data/observable-array").ObservableArray;
global.pageModule = require("ui/page");
global.frame = require("ui/frame");
global.view = require("ui/core/view");

// import iconPackage
try {
    global.iconPackage = require('~/user-module/iconPackage').iconPackage;
} catch (e) {
    console.log("importIconError:", e);
};

app.mainModule = "views/login/login"; //程序主入口
app.start();
