class CreateTeamResponseDTO {
    constructor(team) {
        this.id = team.id;
        this.name = team.name;
    }
}

export default CreateTeamResponseDTO;