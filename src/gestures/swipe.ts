import * as Hammer from 'hammerjs';
import {SwipeMessage} from "../models";
import {device_id} from "../utils";

export class Swipe{

    constructor(public callback: (msg: SwipeMessage)=>void) {

    }

    setupGestures() {
        var touchable = document.getElementById('content');

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

        const callback = this.callback;
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

            let reference: Vector2D;
            if(inSwipe) {
                reference = end;
            } else {
                reference = start;
            }

            let linePoints = [
                new Vector2D(0, 0),
                new Vector2D(0, screenSize.getY()),
                new Vector2D(screenSize.getX(), screenSize.getY()),
                new Vector2D(screenSize.getX(), 0)];

            let lineDirections = [
                new Vector2D(0, 1),
                new Vector2D(1, 0),
                new Vector2D(0, -1),
                new Vector2D(-1, 0)];

            let inters: Vector2D = new Vector2D(-1, -1);
            let edgeNumber = -1;
            let distance = -1;
            for(let i:number = 0; i < linePoints.length; i++) {
                let epsilon = 0.01;
                let coefficients:Vector2D = Vector2D.intersection(reference, direction, linePoints[i], lineDirections[i]);
                if(coefficients.getX() > 0) {
                    inters = reference.plus(direction.scale(coefficients.getX()));
                    if(
                        inters.getX() < screenSize.getX()+epsilon &&
                        inters.getX() > 0 - epsilon &&
                        inters.getY() < screenSize.getY()+epsilon &&
                        inters.getY() > 0 - epsilon){
                        edgeNumber = i;
                        distance = coefficients.getY();
                        break;
                    }
                }
            }

            callback(new SwipeMessage(device_id, edgeNumber, distance, new Date().getTime()));


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
}
