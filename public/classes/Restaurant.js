class Restaurant {
    constructor(tileWidth, tileHeight) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tableMap = new Map();
    }

    updateSize(tileWidth, tileHeight) {
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    getTable(coords) {
        return this.tableMap.get(`${coords[0]}-${coords[1]}`);
    }

    addNewTable(coords) {
        const newTable = new RestTable(coords);
        this.tableMap.set(`${coords[0]}-${coords[1]}`, newTable);
        return newTable;
    }

    removeTable(coords) {
        this.tableMap.delete(`${coords[0]}-${coords[1]}`);
    }
}