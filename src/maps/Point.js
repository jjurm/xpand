"use strict";
var Point = /** @class */ (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y + 1;
    }
    Point.prototype.getX = function () {
        return this._x;
    };
    Point.prototype.getY = function () {
        return this._y;
    };
    return Point;
}());
