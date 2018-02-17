///<reference path="./Point.ts"/>
class MapComponent {
    private upperLeft: Point;
    private lowerRight: Point;

    public constructor(upperLeft: Point, lowerRight: Point) {
        this.upperLeft = upperLeft;
        this.lowerRight = lowerRight;
    }

    public isEqual(map : MapComponent) : boolean {
        return ((this.upperLeft == map.upperLeft) && (this.lowerRight == map.lowerRight));
    }

    public inBounds(p : Point) : boolean {
      return  (this.xInBounds(p.getX()) && this.yInBounds(p.getY()));
    }

    private xInBounds(x : number) : boolean {
        return (x >= this.upperLeft.getX()) && (x <= this.lowerRight.getX());
    }

    private yInBounds(y : number) : boolean {
        return (y <= this.upperLeft.getY()) && (y >= this.lowerRight.getY());
    }
}
