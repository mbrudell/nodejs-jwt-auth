import sequelize from './index.js'
import User from './user.model.js'
import Role from './role.model.js'

User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
})

await sequelize.sync(); // creates all tables force true drops all tables {force: true}
export { User, Role }