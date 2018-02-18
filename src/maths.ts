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
