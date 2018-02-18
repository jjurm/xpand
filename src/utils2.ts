import {AnchoredScreen} from "./models";
import {Vector2D} from "./maths";

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
            throw "invalid edge index " + edge;
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
