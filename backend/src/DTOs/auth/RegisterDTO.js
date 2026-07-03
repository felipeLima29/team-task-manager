import AppError from "../../errors/AppError.js";
import { isValidEmail } from "../../utils/validators.js";

class RegisterDTO {
    constructor(body = {}) {
        const name = body.name?.trim();
        const email = body.email?.trim().toLowerCase();
        const password = body.password?.trim();

        if (!name || !email || !password) {
            throw new AppError("Preencha todos os campos.", 400);
        }

        if(!isValidEmail(email)) {
            throw new AppError("E-mail inválido.", 400)
        }

        if(password.length < 6) {
            throw new AppError("A senha deve conter ao menos 6 caracteres.", 400);
        }

        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
    }
}

export default RegisterDTO;