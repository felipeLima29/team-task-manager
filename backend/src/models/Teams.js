import { DataTypes } from "sequelize";
import connection from "../database/index.js";

const Teams = connection.define('teams', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});

export default Teams;