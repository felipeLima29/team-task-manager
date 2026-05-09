import { DataTypes } from "sequelize";
import connection from "../database";
import Teams from "./Teams";

const Projects = connection.define('projects', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    teamId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'id',
        },
    },

}, {
    timestamps: true,
    paranoid: true,
});

Projects.belongsTo(Teams, {
    foreignKey: 'teamId',
});

Teams.hasMany(Projects, {
    foreignKey: 'teamId',
});

export default Projects;