class CreateProjectResponseDTO {
    constructor(project) {
        this.id = project.id;
        this.name = project.name;
        this.teamId = project.teamId;
    }
}

export default CreateProjectResponseDTO;