const formUser = (dbRows) => {
    const modifiedRows = dbRows.reduce((rows, row) => {
        const { description, duration, date } = row;
        return {...rows, logs: [...rows.logs, { description, duration, date }] };
    }, {
        userId: dbRows[0].userid,
        username: dbRows[0].username,
        logs: []
    });
    return modifiedRows;
}

module.exports = { formUser };