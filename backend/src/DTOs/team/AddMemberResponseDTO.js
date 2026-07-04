class AddMemberResponseDTO {
    constructor(member) {
        this.id = member.id;
        this.userId = member.userId;
        this.teamId = member.teamId;
        this.role = member.role;
    }
}

export default AddMemberResponseDTO;