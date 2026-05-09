import { DataTypes } from "sequelize";
import connection from "../database";

const Teams = connection.define('teams', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

export default Teams;