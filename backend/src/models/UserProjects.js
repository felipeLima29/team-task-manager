import { DataTypes } from "sequelize";
import connection from "../database/index.js";

const UserProjects = connection.define('user_projects', {

    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: 'users',
            key: 'id',
        },
    },

    projectId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        references: {
            model: 'projects',
            key: 'id',
        },
    },

    role: {
        type: DataTypes.ENUM('admin', 'member'),
        allowNull: false,
    },

}, {
    timestamps: true,
    paranoid: true,
});

export default UserProjects;