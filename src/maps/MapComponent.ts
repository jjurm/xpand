///<reference path="./Point.ts"/>
class MapComponent {
    private upperLeft: Point;
    private lowerRight: Point;

    public constructor(upperLeft: Point, lowerRight: Point) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }

    getPoints(): [Point, Point] {
        return [this.upperLeft, this.lowerRight];
    }

    isEqual(map : MapComponent) : boolean {
        return ((this.upperLeft == map.upperLeft) && (this.lowerRight == map.lowerRight));
    }
}
