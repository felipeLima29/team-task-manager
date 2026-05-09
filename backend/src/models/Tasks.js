import { DataTypes } from "sequelize";
import connection from "../database";
import Projects from "./Projects";
import User from "./User";

const Tasks = connection.define('tasks', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('todo', 'in_progress', 'done'),
        defaultValue: 'todo',
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id',
        },
    },
    assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    paranoid: true,
});

Tasks.belongsTo(Projects, { foreignKey: 'projectId' });
Tasks.belongsTo(User, { foreignKey: 'assignedTo' });

Projects.hasMany(Tasks, { foreignKey: 'projectId' });
User.hasMany(Tasks, { foreignKey: 'assignedTo' });

export default Tasks;