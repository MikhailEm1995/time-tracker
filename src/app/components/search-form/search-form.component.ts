import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import {HttpClient} from '@angular/common/http';

import { API_URL } from '../../../constants/ts-variables';
import { Task } from '../../../constants/ts-classes';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit{

  autocompleteControl: FormControl = new FormControl();

  tasks: string[] = ['task 1', 'what 2', 'task 3', 'gfdbhohjis 4', 'task 5', 'task 6'];

  filteredTasks: Task[];

  selected: string = this.tasks[0];

  constructor(
    private tasksService: TasksService
  ) {}

  ngOnInit() {
    this.autocompleteControl.valueChanges
      .subscribe(val => {
        this.filter(val);
      });
  }

  filter(val: string): void {
    this.tasksService.getMatchingTasks(val).subscribe((res) => {
      console.log(res);
      this.filteredTasks = res;
    });
  }
}
