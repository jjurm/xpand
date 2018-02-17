class Map {
    private components: Array<MapComponent>;

    constructor(initialLowerRightPoint : Point) {
        this.components = [this.getInitialMap(initialLowerRightPoint)];
    }
    
    public addMapComponent(map : MapComponent) : void {
        this.components.push(map);
    }
    
    public removeMap(map : MapComponent) : void {
        this.components.forEach((item, index) => {
            if(map.isEqual(item)) {
                this.components.splice(index, 1);
            }
        })
    }

    private getInitialMap(p : Point) : MapComponent {
        return new MapComponent(new Point(0, 0,), p);
    }
}