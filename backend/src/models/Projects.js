import { DataTypes } from "sequelize";
import connection from "../database";

const Projects = connection.define('projects', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
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
});

export default Projects;