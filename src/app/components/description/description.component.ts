import {Component } from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../../constants/ts-classes';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  constructor() {
    TasksService.selectedTask.subscribe((task: Task) => {
      this.updateDescription(task);
    });
  }

  title = '';
  description = '';

  updateDescription(task: Task) {
    this.title = task.id + '. ' + task.summary;
    this.description = task.description;
  }
}
