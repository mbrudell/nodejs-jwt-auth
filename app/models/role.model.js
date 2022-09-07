import { DataTypes } from "sequelize";
import sequelize from "./index.js"

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
})


export default Role;