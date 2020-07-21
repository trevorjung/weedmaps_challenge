const Sequelize = require('sequelize')
const FruitModel = require('./models/fruit')
const fruitData = [{name:'strawberry', weight: 12, url: '/static/media/strawberry.76f3f0fe.jpg'},
{name:'apple', weight: 100, url: '/static/media/apple.1626d3b8.jpg'}, {name:'orange', weight: 141, url: '/static/media/orange.2f8f2f5b.jpg'}, 
{name:'raspberry', weight: 4, url: '/static/media/raspberry.01456409.jpg'}, {name:'banana', weight: 118, url: '/static/media/banana.aa1dd1bf.jpg'},
{name:'peach', weight: 150, url: '/static/media/peach.9533ba69.jpg'}, {name:'mango', weight: 336, url: '/static/media/mango.a2d475cb.jpg'}];

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