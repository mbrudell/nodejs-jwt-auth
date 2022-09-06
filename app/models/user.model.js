import sequelize, { DataTypes } from "sequelize";
import Role from "./role.model"

const User = sequelize.define('users', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

export default User;