class DashboardController {
    async getInfos(req, res, next) {
        try {
            const infos = await 
        } catch (error) {
            next(error);
        }
    }
}

const taskController = new TaskController();
export default taskController;