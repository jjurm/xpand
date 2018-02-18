class Message {
    public time: number;

    public constructor(public device_id: string) {
        this.time = new Date().getTime();
    }
}

export class AnchoredScreen {
    public constructor(public x: number,
                       public y: number,
                       public width: number,
                       public height: number,
                       public rotation: number) {
    }
    public equals(o: AnchoredScreen) {
        return this.x == o.x && this.y == o.y && this.width == o.width && this.height == o.height && this.rotation == o.rotation;
    }
    public toNormallyRotated(): AnchoredScreen {
        switch (this.rotation) {
            case 0:
                return this;
            case 1:
                return new AnchoredScreen(this.x, this.y - this.width, this.height, this.width, 0);
            case 2:
                return new AnchoredScreen(this.x - this.width, this.y - this.height, this.width, this.height, 0);
            case 3:
                return new AnchoredScreen(this.x - this.height, this.y, this.height, this.width, 0);
            default:
                throw "invalid rotation of screen"
        }
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
                       public distance: number,
                       public inSwipe: boolean,
                       public timestamp: number) {
        super(device_id);
    }
}


