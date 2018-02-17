"use strict";
///<reference path="./Point.ts"/>
var MapComponent = /** @class */ (function () {
    function MapComponent(upperLeft, lowerRight) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }
    MapComponent.prototype.isEqual = function (map) {
        return ((this.upperLeft == map.upperLeft) && (this.lowerRight == map.lowerRight));
    };
    MapComponent.prototype.inBounds = function (p) {
        return (this.xInBounds(p.getX()) && this.yInBounds(p.getY()));
    };
    MapComponent.prototype.xInBounds = function (x) {
        return (x >= this.upperLeft.getX()) && (x <= this.lowerRight.getX());
    };
    MapComponent.prototype.yInBounds = function (y) {
        return (y <= this.upperLeft.getY()) && (y >= this.lowerRight.getY());
    };
    return MapComponent;
}());
