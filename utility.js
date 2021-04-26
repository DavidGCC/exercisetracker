const formUser = (dbRows) => {
    const modifiedRows = dbRows.reduce((rows, row) => {
        const { description, duration, date } = row;
        return {...rows, log: [...rows.log, { description, duration, date }] };
    }, {
        '_id': dbRows[0].userid,
        username: dbRows[0].username,
        log: []
    });
    modifiedRows.count = modifiedRows.log.length;
    return modifiedRows;
}

module.exports = { formUser };