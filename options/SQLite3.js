const options = {
    client : "sqlite3",
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    userNullAsDefault: true
}

module.exports = {
    options
}