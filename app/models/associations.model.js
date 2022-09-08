import sequelize from './index.js'
import User from './user.model.js'
import Role from './role.model.js'
import RefreshToken from './refreshToken.model.js'


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

RefreshToken.belongsTo(User, {
    foreignKey: 'userId', targetKey: 'id'
})

User.hasOne(RefreshToken, {
    foreignKey: 'userId', targetKey: 'id'
})

await sequelize.sync(); // creates all tables force true drops all tables {force: true}
export { User, Role, RefreshToken }