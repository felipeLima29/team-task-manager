class AddMemberDTO {
    constructor(body = {}) {
        const email = body.email?.trim().toLowerCase();
        const role = body.role?.trim().toLowerCase();

        this.email = email;
        this.role = role;
    }
}

export default AddMemberDTO;