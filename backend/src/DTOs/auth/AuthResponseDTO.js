class AuthResponseDTO {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}

export default AuthResponseDTO;