class Map {
    private components: Array<MapComponent>;

    constructor(initialLowerRightPoint : Point) {
        this.components = [this.getInitialMap(initialLowerRightPoint)];
    }
    
    public addMapComponent(map : MapComponent) : void {
        this.components.push(map);
    }
    
    public removeMapComponent(map : MapComponent) : void {
        let index = 0;
        for(let i = 0; i < this.components.length; i++) {
          if (this.components[i].isEqual(map)) {
            index = i;
          }
        }

        this.components.splice(index, 1);
    }

    private getInitialMap(p : Point) : MapComponent {
        return new MapComponent(new Point(0, 0,), p);
    }
}


