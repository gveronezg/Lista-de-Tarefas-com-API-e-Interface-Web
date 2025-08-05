import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks: Task[] = [];
    private idCounter = 1;

    findAll(): Task[] {
        return this.tasks;
    }

    create(createTaskDto: CreateTaskDto): Task {
        const task: Task = {
            id: this.idCounter++,
            title: createTaskDto.title,
            completed: false,
        };
        this.tasks.push(task);
        return task;
    }

    updateTitle(id: number, newTitle: string): Task | null {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            return null;
        }
        task.title = newTitle;
        return task;
    }

    updateCompleted(id: number, completed: boolean): Task | null {
        const task = this.tasks.find(t => t.id === id);
        if (!task) {
          return null;
        }
        task.completed = completed;
        return task;
    }

    delete(id: number): boolean {
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) {
            return false;
        }
        this.tasks.splice(index, 1);
        return true;
    }

}