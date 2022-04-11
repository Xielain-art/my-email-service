const {Sequelize} = require('sequelize')

if (process.env.NODE_ENV === 'development') {
    module.exports = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
        }
    )
}
if (process.env.NODE_ENV === 'production') {
    module.exports = new Sequelize(
        process.env.DATABASE_URL, {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    )
}