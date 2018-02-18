import {AnchoredScreen, SwipeMessage} from "./models";

export class PhoneCommunicator {
    private events: Array<SwipeMessage>;
    private map: Array<AnchoredScreen>;
    private phones: Array<Phone>;

    constructor() {
        this.map = [];
        this.phones = [];
        this.events = [];
    }

    private findPhone(device_id: String): Phone | null {
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

        let newScreenRotation = (2 + sourcePhone.getScreen().rotation + sourceEvent.edge - targetEvent.edge) % 4;
    }

    /*private createAnchoredScreen(event1: SwipeMessage, event2: SwipeMessage): AnchoredScreen {
        let original = this.findPhone(swipe.device_id);
    }*/

}

class Phone {
    private uuid: string;
    private screen: AnchoredScreen;

    constructor(uuid: string, screen: AnchoredScreen) {
        this.uuid = uuid;
        this.screen = screen;
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