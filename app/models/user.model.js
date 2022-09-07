import { DataTypes } from "sequelize";
import sequelize from "./index.js"

const User = sequelize.define('users', {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
})


export default User;