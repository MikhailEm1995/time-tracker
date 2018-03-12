import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from '../../../constants/ts-classes';

import { TasksService } from '../../services/tasks.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  autocompleteControl: FormControl = new FormControl();

  tasks: Task[];

  filteredTasks: Task[];

  selected: string;
  isSelected: boolean;

  constructor(
    private tasksService: TasksService,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = localStorage.getItem('taskId');

    if (taskId) {
      this.tasksService.getMatchingTasks(taskId).subscribe(
        (res) => {
          this.selected = taskId;
          this.filteredTasks = res;

          const task = this.filteredTasks.find((elem) => {
            return elem.id === this.selected.split('. ')[0];
          });

          TasksService.selectedTask.next(task);

          this.isSelected = true;
        }
      );
    }

    this.autocompleteControl.valueChanges
      .debounceTime(200)
      .subscribe(val => {
        if (this.isSelected) {
          this.isSelected = false;
          return;
        }

        this.filter(val);
      });

    this.tasksService.getAllTasks().subscribe(
      (res) => {
        this.tasks = res;
        this.selected = this.tasks[0].id;
      }
    );
  }

  filter(val: string): void {
    this.tasksService.getMatchingTasks(val).subscribe(
      (res) => {
        this.filteredTasks = res;
      }
    );
  }

  onChosen = () => {
    this.selected = this.autocompleteControl.value;

    const task = this.filteredTasks.find((elem) => {
      return elem.id === this.selected.split('. ')[0];
    });

    TasksService.selectedTask.next(task);

    this.isSelected = true;
  }

  onSelect = () => {
    const task = this.tasks.find((elem) => {
      return elem.id === this.selected.split('. ')[0];
    });

    TasksService.selectedTask.next(task);

    this.autocompleteControl.reset();
  }
}
