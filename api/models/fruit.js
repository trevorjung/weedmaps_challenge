module.exports = (sequelize, type) => {
    return sequelize.define('fruit', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        weight: type.INTEGER,
        url: type.STRING
    })
}