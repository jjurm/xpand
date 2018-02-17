"use strict";
///<reference path="./Point.ts"/>
var MapComponent = /** @class */ (function () {
    function MapComponent(upperLeft, lowerRight) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }
    MapComponent.prototype.getPoints = function () {
        return [this.upperLeft, this.lowerRight];
    };
    MapComponent.prototype.isEqual = function (map) {
        return ((this.upperLeft == map.upperLeft) && (this.lowerRight == map.lowerRight));
    };
    return MapComponent;
}());
