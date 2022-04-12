const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})

const Email = sequelize.define('email', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    body: {type: DataTypes.STRING},
    sender_id: {type: DataTypes.INTEGER},
    sender_email: {type: DataTypes.STRING},
})
User.hasMany(Email)
Email.belongsTo(User)


module.exports = {
    User,
    Email,
}