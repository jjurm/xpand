class Map {
    private components: Array<MapComponent>;

    constructor() {
        this.components = [];
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

}


