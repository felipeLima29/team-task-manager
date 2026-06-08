import AppError from "../../errors/AppError.js";

class CreateTeamDTO {
    constructor(body) {
        const { name } = body;
        if(!name) {
            throw new AppError("Preencha todos os campos.", 400);
        }

        this.name = body.name;
    }
}

export default CreateTeamDTO;