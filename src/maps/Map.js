"use strict";
var Map = /** @class */ (function () {
    function Map() {
        this.components = [];
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
    return Map;
}());
