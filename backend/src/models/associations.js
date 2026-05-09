import User from './User.js';
import Teams from './Teams.js';
import Projects from './Projects.js';
import Tasks from './Tasks.js';
import UserTeams from './UserTeams.js';


// =========================

Projects.belongsTo(Teams, {
    foreignKey: 'teamId',
});

Teams.hasMany(Projects, {
    foreignKey: 'teamId',
});


// =========================

Tasks.belongsTo(Projects, {
    foreignKey: 'projectId',
});

Projects.hasMany(Tasks, {
    foreignKey: 'projectId',
});


// =========================

Tasks.belongsTo(User, {
    foreignKey: 'assignedTo',
});

User.hasMany(Tasks, {
    foreignKey: 'assignedTo',
});


// =========================

UserTeams.belongsTo(User, {
    foreignKey: 'userId',
});

UserTeams.belongsTo(Teams, {
    foreignKey: 'teamId',
});

User.hasMany(UserTeams, {
    foreignKey: 'userId',
});

Teams.hasMany(UserTeams, {
    foreignKey: 'teamId',
});