import AppError from "../../errors/AppError.js";

class UpdateStatusTaskDTO {
    constructor(body = {}) {
        const status = ['todo', 'in_progress', 'done'];
        if(!status.includes(body.status?.trim())) { throw new AppError("Status inválido.", 400); }

        this.status = body.status;
    }
}

export default UpdateStatusTaskDTO;