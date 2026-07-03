import AppError from "../../errors/AppError.js";

class CreateProjectDTO {
    constructor(body = {}) {
        const  name = body.name?.trim();
        if(!name) {
            throw new AppError("Preencha todos os campos.", 400);
        }
        
        this.name = body.name;
    }
}
export default CreateProjectDTO;