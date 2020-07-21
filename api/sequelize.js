const Sequelize = require('sequelize')
const FruitModel = require('./models/fruit')
const fruitData = [{name:'strawberry', weight: 12, url: '/images/strawberry.jpg'},
{name:'apple', weight: 100, url: '/images/apple.jpg'}, {name:'orange', weight: 141, url: '/images/orange.jpg'}, 
{name:'raspberry', weight: 4, url: '/images/raspberry.jpg'}, {name:'banana', weight: 118, url: '/images/banana.jpg'},
{name:'peach', weight: 150, url: '/images/peach.jpg'}, {name:'mango', weight: 336, url: '/images/mango.jpg'}];

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

const Fruit = FruitModel(sequelize, Sequelize)

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`);
    Fruit.bulkCreate(fruitData);
  })

module.exports = {
  Fruit
}