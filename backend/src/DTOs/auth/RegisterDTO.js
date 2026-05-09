class RegisterDTO {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
    }
}

export default RegisterDTO;