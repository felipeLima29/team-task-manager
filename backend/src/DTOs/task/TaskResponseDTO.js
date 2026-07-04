class TaskResponseDTO {
    constructor(task) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.projectId = task.projectId;
        this.assignedTo = task.assignedTo;
    }
}

export default TaskResponseDTO;