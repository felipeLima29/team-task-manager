import { DataTypes } from "sequelize";
import connection from "../database";
import User from "./User";
import Teams from "./Teams";

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

UserTeams.belongsTo(User, { foreignKey: 'userId' });
UserTeams.belongsTo(Teams, { foreignKey: 'teamId' });

User.hasMany(UserTeams, { foreignKey: 'userId' });
Teams.hasMany(UserTeams, { foreignKey: 'teamId' });

export default UserTeams;