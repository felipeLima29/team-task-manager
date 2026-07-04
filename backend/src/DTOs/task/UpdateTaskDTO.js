import AppError from "../../errors/AppError.js";

class UpdateTaskDTO {
    constructor(body = {}) {

        const allowedFields = ["title", "description", "assignedTo"];

        const receivedFields = Object.keys(body);

        if (receivedFields.length === 0) { throw new AppError("Pelo menos um campo deve ser fornecido para atualização.", 400); }

        const invalidField = receivedFields.find(
            field => !allowedFields.includes(field)
        );

        if (invalidField) { throw new AppError(`Campo '${invalidField}' não permitido.`, 400); }

        if (body.title !== undefined) {
            const title = body.title.trim();

            if (!title) { throw new AppError("Título inválido.", 400); }

            this.title = title;
        }

        if (body.description !== undefined) {
            this.description = body.description.trim();
        }

        if (body.assignedTo !== undefined) {
            this.assignedTo = body.assignedTo.trim();
        }
    }
}

export default UpdateTaskDTO;