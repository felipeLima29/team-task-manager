import connection from './index.js';

import '../models/User.js';
import '../models/Teams.js';
import '../models/Projects.js';
import '../models/Tasks.js';
import '../models/UserTeams.js';

async function syncDatabase() {

    try {
        await connection.sync({
            alter: true,
        });
        console.log('Banco sincronizado 🚀');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

}

syncDatabase();