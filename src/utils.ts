import {Vector2D} from "./gestures/swipe";
import {AnchoredScreen} from "./models";

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function getOrientation() {
    return Math.abs(<number>window.orientation) - 90 == 0 ? "landscape" : "portrait";
}

export function getScreenWidth() {
    return getOrientation() == "landscape" ? window.innerHeight : window.innerWidth;
}

export function getScreenHeight() {
    return getOrientation() == "landscape" ? window.innerWidth : window.innerHeight;
}

export let device_id = guid();

export function getEdgeStart(edge: number, screen: AnchoredScreen): Vector2D {
    switch (edge) {
        case 0:
            return new Vector2D(screen.x, screen.y);
        case 1:
            return new Vector2D(screen.x, screen.y + screen.height);
        case 2:
            return new Vector2D(screen.x + screen.width, screen.y + screen.height);
        case 3:
            return new Vector2D(screen.x + screen.width, screen.y);
        default:
            throw "invalid edge index";
    }
}

export function getEdgeVector(edge: number, screen: AnchoredScreen): Vector2D {
    switch (edge) {
        case 0:
            return new Vector2D(0, screen.height);
        case 1:
            return new Vector2D(screen.width, 0);
        case 2:
            return new Vector2D(0, -screen.height);
        case 3:
            return new Vector2D(-screen.width, 0);
        default:
            throw "invalid edge index";
    }
}

export function getEdgeNormalVector(edge: number): Vector2D {
    switch (edge) {
        case 0:
            return new Vector2D(0, 1);
        case 1:
            return new Vector2D(1, 0);
        case 2:
            return new Vector2D(0, -1);
        case 3:
            return new Vector2D(-1, 0);
        default:
            throw "invalid edge index";
    }
}

