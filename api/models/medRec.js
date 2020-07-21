module.exports = (sequelize, type) => {
    return sequelize.define('medicalRecommendation', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        medRecId: type.INTEGER,
        issuer: type.STRING,
        state: type.STRING,
        expirationDate: type.DATE,
        imageUrl: type.STRING
    })
}