import { DataTypes, UUIDV4 } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import SupportTicket from "./SupportTicket.js";

const SupportMessage = sequelize.define("SupportMessage", {
    id: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true },
    content: { type: DataTypes.TEXT, allowNull: false },
}, {
    tableName: "support_messages",
    underscored: true,
});

SupportMessage.belongsTo(SupportTicket, { as: "ticket", foreignKey: "ticketId" });
SupportTicket.hasMany(SupportMessage, { as: "messages", foreignKey: "ticketId" });

SupportMessage.belongsTo(User, { as: "sender", foreignKey: "senderId" });
User.hasMany(SupportMessage, { as: "sentMessages", foreignKey: "senderId" });

export default SupportMessage;
