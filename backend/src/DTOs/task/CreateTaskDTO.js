import AppError from "../../errors/AppError.js";

class CreateTaskDTO {
    constructor(body = {}) {
        const title = body.title?.trim();
        const description = body.description?.trim();
        const assignedTo = body.assignedTo?.trim();
        if(!title || !description || !assignedTo) {
            throw new AppError("Preencha todos os campos.", 400);
        }
        
        this.title = body.title;
        this.description = body.description;
        this.assignedTo = body.assignedTo;
    }
}

export default CreateTaskDTO;