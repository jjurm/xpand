import {AnchoredScreen, SwipeMessage} from "./models";

class PhoneCommunicator {
    private events : Array<SwipeMessage>
    private map : Array<AnchoredScreen>;
    private phones : Array<Phone>;

    constructor(screen : AnchoredScreen) {
        this.map = [screen];
        this.phones = [];
        this.events = [];
    }

    private findPhone(device_id : String) : Phone | null {
        var swipeId = +device_id;
        for (let phone of this.phones) {
            if(phone.getUuid() == swipeId) {
                return phone;
            }
        }
        return null;
    }

    private addToEvents(event : SwipeMessage) {
        this.events.push(event);
        let len = this.events.length;
        if((len % 2 == 0)) {
            if ((Math.abs(this.events[len-2].timestamp-this.events[len-1].timestamp)) < 0.4) {
             //   processEvents(this.events[len-2], this.events[len-1]);
            }
        }
    }

    private processEvents(event1 : SwipeMessage, event2 : SwipeMessage) : void {
       // newScreen = this.createAnchoredScreen(event1, event2);
    }

   // private createAnchoredScreen(event1 : SwipeMessage, event2 : SwipeMessage) : AnchoredScreen {
      // let original = this.findPhone(swipe.device_id);

}

class Phone {
    private uuid: number;
    private screen: AnchoredScreen;

    constructor(uuid: number, screen: AnchoredScreen) {
        this.uuid = uuid;
        this.screen = screen;
    }

    getScreen() : AnchoredScreen{
        return this.screen;
    }

    getUuid() : number{
        return this.uuid;
    }

    updateMap(screen: AnchoredScreen) : void{
        this.screen = screen;
    }

    isEqual(p : Phone) : boolean{
        return p.getUuid() == this.getUuid();
    }
}