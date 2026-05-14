import AppError from "../../errors/AppError.js";
import { isValidEmail } from "../../utils/validators.js";

class RegisterDTO {
    constructor(body) {
        const { name, email, password } = body;
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