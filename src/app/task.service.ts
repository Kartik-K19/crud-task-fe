import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

  //to fetch all taskLists
  getAllTaskLists(): Observable<TaskListModel[]>{
    return this.apiConfigService.getTaskLists('tasklists')
  }
  getAllTasks(taskListId:string): Observable<TaskModel[]>{
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`)
  }

  //create a tasklist bucket
  createTaskList(title: string):Observable<TaskListModel>{
    let data = {'title':title};
    return this.apiConfigService.post('tasklists', data);
  }

  //get all the tasks inside a tasklist
  getAllTasksForATaskList(taskListId : string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  //create a task inside a particular tasklist 
  createTaskInsideTaskList(taskListId: string, title:string){
  
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`,{title});
  }

  //delete a tasklist
  deleteTaskList(taskListId:string):Observable<TaskListModel>{
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);
  }

  //delete a task inside a particular tasklist
  deleteAtaskInsideATaskList(taskListId:string, taskId: string): Observable<TaskModel>{
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }
//update a status of a task 
  updateTaskStatus(taskListId:string, taskObject: TaskModel){
    let updateData = {'completed': !taskObject.completed};
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`,updateData);
  }

}
