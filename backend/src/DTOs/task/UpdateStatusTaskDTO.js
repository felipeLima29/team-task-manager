import AppError from "../../errors/AppError.js";

class UpdateStatusTaskDTO {
    constructor(body = {}) {

        const status = body.status?.trim();

        const allowedStatus = [
            "todo",
            "in_progress",
            "done"
        ];

        if (!allowedStatus.includes(status)) {
            throw new AppError("Status inválido.", 400);
        }

        this.status = status;
    }
}

export default UpdateStatusTaskDTO;