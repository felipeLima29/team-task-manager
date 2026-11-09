import UserProjects from "../models/UserProjects.js"

class DashboardService {

    async getInfos(userId) {

        const infos = await UserProjects.findAll({
            where: {userId},
            attributes: []
        })

    }

}

const dashboardService = new DashboardService();
export default dashboardService;