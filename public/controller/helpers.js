const getCoordsFromID = (cellID) => {
    return [cellID.split("-")[0], cellID.split("-")[1]];
};

const getTableNumFromID = (cellID) => {
    const tableCoords = getCoordsFromID(cellID);
    return `${(parseInt(tableCoords[0]) + 1)}-${(parseInt(tableCoords[1]) + 1)}`;
};