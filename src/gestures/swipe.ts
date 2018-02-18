import * as Hammer from 'hammerjs';

export class Swipe{

    setupGestures() {
        var touchable = document.getElementById('touchable');

        // create a manager for screen
        if(touchable == null) {
            throw new DOMException("screen is null");
        } else {
            var mc = new Hammer.Manager(<HTMLElement>touchable);
        }

        // create a recognizer
        var swipe = new Hammer.Swipe();

        // add the recognizer
        mc.add(swipe);

        mc.on('swipe', function(e) {
            let start: Vector2D = new Vector2D(e.changedPointers[0].screenX-e.deltaX,e.changedPointers[0].screenY-e.deltaY);
            let end: Vector2D = new Vector2D(e.changedPointers[0].screenX, e.changedPointers[0].screenY)

            let direction: Vector2D = (new Vector2D(e.deltaX, e.deltaY)).normalised();

            let screenSize: Vector2D = new Vector2D(screen.width, screen.height);

            let minStartDist: Vector2D = new Vector2D(Math.min(start.getX(), screenSize.getX()-start.getX()), Math.min(start.getY(), screenSize.getY()-start.getY()));
            let minEndDist: Vector2D = new Vector2D(Math.min(end.getX(), screenSize.getX()-end.getX()), Math.min(end.getY(), screenSize.getY()-end.getY()));

            let inSwipe: boolean = false;
            if(Math.min(minStartDist.getX(), minStartDist.getY()) < Math.min(minEndDist.getX(), minEndDist.getY())){
                inSwipe = true;
            }

            let border1: Vector2D = new Vector2D(0, 0);
            let border2: Vector2D = new Vector2D(0, 0);
            let reference: Vector2D;
            if(inSwipe) {
                direction = direction.dot(-1);
                reference = end;
            } else {
                reference = start;
            }

            if(direction.getX() > 0){

                if(direction.getY() > 0) {
                    border1 = new Vector2D(screenSize.getX(), direction.getY()*(screenSize.getX()-reference.getX())/direction.getX());
                }
            }
        });
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

    intersection(A:Vector2D, dA:Vector2D, B:Vector2D, dB:Vector2D) {
        let lTop = A.getY()-B.getY()+(B.getX()-A.getX())*(dA.getY()/dA.getX());
        let lDown = dB.getY() - dB.getX()*(dA.getY()/dA.getX());
        let l = lTop/lDown;

        let k = (B.getX()+l*dB.getX()-A.getX())/dA.getX();
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
