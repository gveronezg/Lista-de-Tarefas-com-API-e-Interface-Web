import { Controller, Get, Post, Delete, Body, Param, Patch, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { NotFoundException } from '@nestjs/common';

@Controller('tasks') // Define que todas as rotas aqui começam com /tasks.
export class TaskController {
  constructor(private readonly taskService: TaskService) {} // Injeta o serviço para usá-lo nos métodos.

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  updateTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') newTitle: string, // Extrai do corpo da requisição (JSON) o valor da propriedade "title" e joga em newTitle.
  ) {
    const task = this.taskService.updateTitle(id, newTitle);
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return task;
  }

  @Patch(':id/completed')
  updateCompleted(
    @Param('id') id: string,
    @Body('completed') completed: boolean
  ) {
    const thisId = parseInt(id, 10);
    return this.taskService.updateCompleted(thisId, completed);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const thisId = parseInt(id, 10);
    return this.taskService.remove(thisId);
  }
}
