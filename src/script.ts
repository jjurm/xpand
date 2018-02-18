import {UpdateMessage} from "./models";
import {Swipe} from "./gestures/swipe"
import {Interval, Intervals, Vector2D} from "./maths";
import {AnchoredScreen} from "./models";
import {getScreenHeight, getScreenWidth} from "./utils";
import {getEdgeNormalVector, getEdgeStart, getEdgeVector} from "./utils2";

let ws: WebSocket;

let localScreen = new AnchoredScreen(0, 0, getScreenWidth(), getScreenHeight(), 0);
let map: AnchoredScreen[] = [
    localScreen,
    /*new AnchoredScreen(-200, -200, 200, 400, 0),
    new AnchoredScreen(1000, -150, 2000, 150, 0),
    new AnchoredScreen(500, 949, 1000, 600, 0),
    new AnchoredScreen(-200, 949+220, 220, 400, 1),*/
];

function start() {
    window.onresize = event => render();

    ws = new WebSocket("ws://localhost:8080/");
    ws.onopen = event => {

        // socket opened
        console.log("Socket opened");
    };
    ws.onmessage = event => {
        let data: UpdateMessage = JSON.parse(event.data);
        console.log("Got time " + data.time);
    };

    let swipe:Swipe = new Swipe(msg => {
        console.log("sending");
        ws.send(JSON.stringify(msg));
    });
    swipe.setupGestures();

    render();
}

function render() {
    let canvas = document.getElementById("content") as HTMLCanvasElement;
    canvas.width = getScreenWidth();
    canvas.height = getScreenHeight();
    let ctx = canvas.getContext("2d")!;

    function xt(vector: Vector2D) {
        return vector.getX();
    }

    function yt(vector: Vector2D) {
        return vector.getY();
    }

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let lineWidth = 40;
    ctx.fillStyle = "#00FF00";
    for (let e = 0; e < 4; e++) {
        //console.log("EDGE " + e);
        let partsStartEnd = [0, getEdgeVector(e, localScreen).size()];
        let eStart = getEdgeStart(e, localScreen);
        let eEnd = eStart.plus(getEdgeVector(e, localScreen));
        let parts = new Intervals(
            (e % 2 == 0)
                ? new Interval(eStart.getY(), eEnd.getY())
                : new Interval(eStart.getX(), eEnd.getX())
        );

        for (let anchoredScreen of map) {
            if (anchoredScreen.equals(localScreen)) continue;
            anchoredScreen = anchoredScreen.toNormallyRotated();

            for (let ie2 = 0; ie2 < 2; ie2++) {
                let e2 = (e + 2 * ie2) % 4;

                let edge1start = getEdgeStart(e, localScreen);
                let edge2start = getEdgeStart(e2, anchoredScreen);
                //console.log("edge1start: " + edge1start + ", edge2start: " + edge2start);

                let diff = (e % 2 == 0)
                    ? Math.abs(edge1start.getX() - edge2start.getX())
                    : Math.abs(edge1start.getY() - edge2start.getY());

                //console.log("diff: " + diff);
                if (diff <= 1) {

                    // we need to subtract from the interval
                    let minuend: Interval;
                    if (e % 2 == 0) {
                        /*console.log("edge2startY: " + edge2start.getY() + ", edge2vector: "
                            + getEdgeVector(e2, anchoredScreen) + ", edge2Y: " + edge2start.plus(getEdgeVector(e2, anchoredScreen)).getY());*/
                        minuend = new Interval(edge2start.getY(), edge2start.plus(getEdgeVector(e2, anchoredScreen)).getY());
                        console.log("  " + minuend);
                    } else {
                        minuend = new Interval(edge2start.getX(), edge2start.plus(getEdgeVector(e2, anchoredScreen)).getX());
                    }
                    parts.subtract(minuend);
                }
            }
        }

        for (let part of parts.intervals) {
            ctx.beginPath();
            let edgeNormalVector = getEdgeNormalVector(e);

            let cornerA = eStart;
            let coord = (e < 2) ? part.from : part.to;
            if (e % 2 == 0) {
                cornerA = new Vector2D(cornerA.getX(), coord);
            } else {
                cornerA = new Vector2D(coord, cornerA.getY());
            }
            ctx.moveTo(xt(cornerA), yt(cornerA));

            let edge = getEdgeVector(e, localScreen);
            let cornerB = cornerA.plus(edgeNormalVector.scale(part.size()));
            ctx.lineTo(xt(cornerB), yt(cornerB));

            let perp = edge.perpendicular().normalised().scale(10);
            let cornerC = cornerB.plus(perp);
            ctx.lineTo(xt(cornerC), yt(cornerC));

            let cornerD = cornerA.plus(perp);
            ctx.lineTo(xt(cornerD), yt(cornerD));

            ctx.closePath();
            ctx.fill();
        }

    }
}

start();
