"use strict";
var Map = /** @class */ (function () {
    function Map(initialLowerRightPoint) {
        this.components = [this.getInitialMap(initialLowerRightPoint)];
    }
    Map.prototype.addMapComponent = function (map) {
        this.components.push(map);
    };
    Map.prototype.removeMapComponent = function (map) {
        var index = 0;
        for (var i = 0; i < this.components.length; i++) {
            if (this.components[i].isEqual(map)) {
                index = i;
            }
        }
        this.components.splice(index, 1);
    };
    Map.prototype.getInitialMap = function (p) {
        return new MapComponent(new Point(0, 0), p);
    };
    return Map;
}());
