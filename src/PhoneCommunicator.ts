import {AnchoredScreen, SwipeMessage} from "./models";

class PhoneCommunicator {
    private map : Array<PhoneCommunicator>;
    private phones : Array<Phone>;

    constructor() {
        this.map = [];
        this.phones = [];
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

    //private createAnchoredScreen(swipe : SwipeMessage) : AnchoredScreen {
     //  let original = this.findPhone(swipe.device_id);



    //}
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