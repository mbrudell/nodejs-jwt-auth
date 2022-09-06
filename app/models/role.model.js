import sequelize, { DataTypes } from "sequelize";

const Role = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
})

export default Role;