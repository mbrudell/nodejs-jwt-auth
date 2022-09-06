import sequelize, { DataTypes } from "sequelize";

const User = sequelize.define('users', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})

export default User;