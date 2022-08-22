export enum TaskStatus {
    Pending = 0,
    Done = 1
} 

export interface Task {
    id: number;
    description: string;
    dueDate: Date | undefined;
    doneDate: Date | undefined;
    status: TaskStatus;
}
