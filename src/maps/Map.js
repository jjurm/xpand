"use strict";
var Map = /** @class */ (function () {
    function Map(initialLowerRightPoint) {
        this.components = [this.getInitialMap(initialLowerRightPoint)];
    }
    Map.prototype.addMapComponent = function (map) {
        this.components.push(map);
    };
    Map.prototype.removeMap = function (map) {
        var _this = this;
        this.components.forEach(function (item, index) {
            if (map.isEqual(item)) {
                _this.components.splice(index, 1);
            }
        });
    };
    Map.prototype.getInitialMap = function (p) {
        return new MapComponent(new Point(0, 0), p);
    };
    return Map;
}());
