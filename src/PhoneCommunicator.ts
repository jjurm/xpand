import {AnchoredScreen, SwipeMessage} from "./models";
import {getEdgeNormalVector, getEdgeStart} from "./utils2";

export class PhoneCommunicator {
    private events: Array<SwipeMessage>;
    private map: Array<AnchoredScreen>;
    private phones: Array<Phone>;

    constructor() {
        this.map = [];
        this.phones = [];
        this.events = [];
    }

    public addPhone(phone: Phone) {
        this.phones.push(phone);
    }

    public findPhone(device_id: String): Phone | null {
        for (let phone of this.phones) {
            if (phone.getUuid() == device_id) {
                return phone;
            }
        }
        return null;
    }

    private addToEvents(event: SwipeMessage) {
        this.events.push(event);
        let len = this.events.length;
        if (len < 2) return;
        let e1 = this.events[len - 2];
        let e2 = this.events[len - 1];
        if ((Math.abs(e1.time - e2.time)) < 1.0) {

            this.processEvents(e1, e2);
        }
    }

    private processEvents(sourceEvent: SwipeMessage, targetEvent: SwipeMessage): void {
        let sourcePhone = this.findPhone(sourceEvent.device_id)!;
        let targetPhone = this.findPhone(targetEvent.device_id)!;
        let sourceScreen = sourcePhone.getScreen();
        let targetScreen = targetPhone.getScreen();

        let newScreenRotation = (2 + sourcePhone.getScreen().rotation + sourceEvent.edge - targetEvent.edge) % 4;

        let sourceEdge = sourceEvent.edge;
        let start = getEdgeStart(sourceEdge, sourceScreen);
        let move1 = getEdgeNormalVector((sourceEvent.edge + sourceScreen.rotation) % 4)
            .scale(sourceEvent.distance + targetEvent.distance);
        start = start.plus(move1);

        let newScreen = new AnchoredScreen(start.getX(), start.getY(),
            targetScreen.width, targetScreen.height, targetScreen.rotation);

        let i = 0;
        while (i < this.map.length) {
            if (this.map[i].equals(targetScreen)) {
                this.map.splice(i, 1);
            } else i++;
        }
        this.map.push(targetScreen);
        this.mapUpdated();
    }

    public mapUpdated() {
        console.log("MAP UPDATED");
        console.log(this.map);
    }

    /*private createAnchoredScreen(event1: SwipeMessage, event2: SwipeMessage): AnchoredScreen {
        let original = this.findPhone(swipe.device_id);
    }*/

}

export class Phone {
    private uuid: string;
    private screen: AnchoredScreen;
    private ws: WebSocket;

    constructor(uuid: string, screen: AnchoredScreen, ws: WebSocket) {
        this.uuid = uuid;
        this.screen = screen;
        this.ws = ws;
    }

    getScreen(): AnchoredScreen {
        return this.screen;
    }

    getUuid(): string {
        return this.uuid;
    }

    updateMap(screen: AnchoredScreen): void {
        this.screen = screen;
    }

    isEqual(p: Phone): boolean {
        return p.getUuid() == this.getUuid();
    }
}