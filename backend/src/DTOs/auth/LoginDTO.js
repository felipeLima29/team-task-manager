import { isValidEmail } from "../../utils/validators.js";

class LoginDTO {
    constructor(body) {
        const { email, password } = body;

        if (!email || !password) {
            throw new AppError("Preencha todos os campos.", 400);
        }

        if (!isValidEmail(email)) {
            throw new AppError("E-mail inválido.", 400)
        }
        if (password.length < 6) {
            throw new AppError("A senha deve conter ao menos 6 caracteres.", 400);
        }

        this.email = body.email;
        this.password = body.password;
    }
}

export default LoginDTO;