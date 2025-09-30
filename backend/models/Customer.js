import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Customer = sequelize.define('Customer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: User, key: 'id'}},
    address: DataTypes.STRING(255),
    city: DataTypes.STRING(255),
    country: DataTypes.STRING(255),
    idNumber: DataTypes.STRING(255),
}, {
  tableName: 'Customers',
  timestamps: true,
});
export default Customer;