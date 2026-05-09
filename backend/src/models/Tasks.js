import connection from "../database";

const Tasks = connection.define('tasks', {
    id: {
        type: DataTypes.UUID,
        autoIncrement: true,
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
});

export default Tasks;