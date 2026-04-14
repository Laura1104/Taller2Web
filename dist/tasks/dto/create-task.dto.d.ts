export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    DONE = "done"
}
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
}
