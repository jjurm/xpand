export class Interval {
    public from: number;
    public to: number;

    constructor(from: number, to: number) {
        if (from > to) {
            let tmp = to;
            to = from;
            from = tmp;
        }
        this.from = from;
        this.to = to;
    }

    public containedIn(outer: Interval) {
        return this.from >= outer.from && this.to <= outer.to;
    }

    public toString() {
        return "(" + this.from + ", " + this.to + ")";
    }

    public size() {
        return this.to - this.from + 1;
    }
}

export class Intervals {

    public intervals: Interval[];

    constructor(base: Interval) {
        this.intervals = [base];
    }

    subtract(minuend: Interval) {
        //console.log("Intervals: subtracting " + minuend + " from " + this.intervals);
        for (let i = 0; i < this.intervals.length;) {
            let interval = this.intervals[i];
            // fully contained in minuend
            if (interval.containedIn(minuend)) {
                // remove completely
                this.intervals.splice(i, 1);
            }
            else if (interval.from < minuend.from && minuend.from <= interval.to) {
                interval.to = minuend.from - 1;
                if (interval.to < interval.from) {
                    this.intervals.splice(i, 1);
                } else i++;
            } else if (interval.from <= minuend.to && minuend.to < interval.to) {
                interval.from = minuend.to + 1;
                if (interval.to < interval.from) {
                    this.intervals.splice(i, 1);
                } else i++;
            } else if (minuend.containedIn(interval)) {
                this.intervals.splice(i, 1);
                let left  = new Interval(interval.from, minuend.from - 1);
                let right = new Interval(minuend.to + 1, interval.to);
                if (right.size() >= 1) {
                    this.intervals.splice(i, 0, right);
                }
                if (left.size() >= 1) {
                    this.intervals.splice(i, 0, left);
                }
                i += 2;
            } else i++;
        }
        //console.log("  got " + this.intervals);
    }


}

export class Vector2D {
    private x: number;
    private y: number;

    constructor(x:number, y: number) {
        this.x = x;
        this.y = y;
    }

    normalised() {
        let size = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        return new Vector2D(this.x/size, this.y/size)
    }

    dot(c:number){
        return new Vector2D(this.x*c, this.y*c);
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    public static intersection(A:Vector2D, dA:Vector2D, B:Vector2D, dB:Vector2D){
        let lTop = A.getY() - B.getY() + B.getX()*(dA.getY()/dA.getX())-A.getX()*(dA.getY()/dA.getX());
        let lDown = dB.getY() - dB.getX()*(dA.getY()/dA.getX());

        let l = lTop/lDown;

        let k = (B.getX() + l*dB.getX() - A.getX())/dA.getX();

        return new Vector2D(k, l);
    }

    plus(vector: Vector2D) {
        return new Vector2D(this.x + vector.x, this.y + vector.y);
    }
    perpendicular() {
        return new Vector2D(this.y, -this.x);
    }
    scale(scale: number) {
        return new Vector2D(this.x * scale, this.y * scale);
    }
    size() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    public toString() {
        return "[" + this.x + ", " + this.y + "]";
    }
}
