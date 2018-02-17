class Message {
    public time: number;

    public constructor(public device_id: string) {
        this.time = new Date().getTime();
    }
}

class AnchoredScreen {
    public constructor(public x: number,
                       public y: number,
                       public rotation: number) {
    }
}

export class UpdateMessage extends Message {
    public constructor(device_id: string,
                       public map: AnchoredScreen[],
                       public localScreen: AnchoredScreen) {
        super(device_id);
    }
}

export class SwipeMessage extends Message {
    public constructor(device_id: string,
                       public edge: number,
                       public distance: number) {
        super(device_id);
    }
}


