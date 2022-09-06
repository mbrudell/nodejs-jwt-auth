import sequelize, { DataTypes } from "sequelize";
import User from "./user.model"

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
})

Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
})

export default Role;