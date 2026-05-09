import { DataTypes } from "sequelize";
import connection from "../database/index.js";

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

export default Projects;