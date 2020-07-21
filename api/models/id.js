module.exports = (sequelize, type) => {
    return sequelize.define('governmentId', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        governmentIdNumber: type.INTEGER,
        state: type.STRING,
        expirationDate: type.DATE,
        imageUrl: type.STRING
    })
}