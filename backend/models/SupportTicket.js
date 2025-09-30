import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";

const SupportTicket = sequelize.define("SupportTicket", {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    subject: { type: DataTypes.STRING(255), allowNull: false },
    status: { type: DataTypes.ENUM("Waiting", "Assigned", "Active", "Closed"), defaultValue: "Waiting" },
    assignedTo: { type: DataTypes.INTEGER, allowNull: true }, // userId của nhân viên
}, {
    tableName: "support_tickets",
    underscored: true,
});

SupportTicket.belongsTo(User, { as: "customer", foreignKey: "customerId" });
User.hasMany(SupportTicket, { as: "customerTickets", foreignKey: "customerId" });

User.hasMany(SupportTicket, { as: "assignedTickets", foreignKey: "assignedTo" });
SupportTicket.belongsTo(User, { as: "assignee", foreignKey: "assignedTo" });

export default SupportTicket;
