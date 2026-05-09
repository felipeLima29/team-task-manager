import { DataTypes } from "sequelize";
import connection from "../database/index.js";

const UserTeams = connection.define('user_teams', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    teamId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: 'teams',
            key: 'id',
        },
    },
    role: {
        type: DataTypes.ENUM('admin', 'member'),
        allowNull: false,
    }
}, {
    timestamps: true,
    paranoid: true,
});

export default UserTeams;