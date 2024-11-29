require('dotenv').config();
const Sequelize = require('sequelize');

const DB_CREDENTIAL = {
    username    : process.env.DB_USERNAME,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_DATABASE,
    host    : process.env.DB_HOST,
    port    : process.env.DB_PORT,
    logging : process.env.DB_LOGGING === 'true' ? console.log : false,
    dialect : process.env.DB_CONNECTION,
    dialectOptions: {
        decimalNumbers: true
    },
    seederStorage : "sequelize",
    seederStorageTableName : "SequelizeMetaSeeders"
}

sequelize = new Sequelize(DB_CREDENTIAL);
sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Disconnected..'+ err)
})


module.exports = {
    development: DB_CREDENTIAL,
    database: sequelize,
}