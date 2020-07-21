const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const MedRecModel = require('./models/medRec')
const IdModel = require('./models/id')

const sequelize = new Sequelize('challenge_app', 'root', 'home1382', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const MedRec = MedRecModel(sequelize, Sequelize)
const GovernmentId = IdModel(sequelize, Sequelize)

User.hasMany(MedRec, {foreignKey: 'user_id'});
User.belongsTo(GovernmentId, {foreignKey: 'user_id'});

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    User.create({ name: 'Dummy', email: 'Test@Test', birthday:'10-15-90' });
    GovernmentId.create({ governmentIdNumber: 321, state:'Minnesota', expirationDate: '10-15-1990', imageUrl: 'testpathurl', user_id: 1 });
    MedRec.create({ medRecId: 123, issuer: 'Issuer', state:'Minnesota', expirationDate: '10-15-2020', imageUrl: 'testpathurl', user_id: 1 });
  })

module.exports = {
  User,
  MedRec,
  GovernmentId
}