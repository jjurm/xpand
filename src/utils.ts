import {Vector2D} from "./gestures/swipe";
import * as assert from "assert";

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

export function getMobileWidth() {
    return getOrientation() == "landscape" ? screen.availHeight : screen.availWidth;
}

export function getMobileHeight() {
    return getOrientation() == "landscape" ? screen.availWidth : screen.availHeight;
}

export let device_id = guid();
export let screenSize = {
    x: getMobileWidth(),
    y: getMobileHeight()
};

export function getEdgeStart(edge: number): Vector2D {
    switch (edge) {
        case 0:
            return new Vector2D(0, 0);
        case 1:
            return new Vector2D(0, screenSize.y);
        case 2:
            return new Vector2D(screenSize.x, screenSize.y);
        case 3:
            return new Vector2D(screenSize.x, 0);
        default:
            throw "invalid edge index";
    }
}

export function getEdgeVector(edge: number): Vector2D {
    switch (edge) {
        case 0:
            return new Vector2D(0, screenSize.y);
        case 1:
            return new Vector2D(screenSize.x, 0);
        case 2:
            return new Vector2D(0, -screenSize.y);
        case 3:
            return new Vector2D(-screenSize.x, 0);
        default:
            throw "invalid edge index";
    }

}

