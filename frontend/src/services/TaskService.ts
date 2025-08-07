import api from '../api/api';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export const TaskService = {
    async getAll(): Promise<Task[]> {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    },

    async create(title: string): Promise<Task> {
        const response = await api.post<Task>('/tasks', {title});
        return response.data;
    },
};