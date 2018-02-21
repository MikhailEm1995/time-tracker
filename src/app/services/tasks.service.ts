import { Injectable } from '@angular/core';

import { API_URL } from '../../constants/ts-variables';
import { Task } from '../../constants/ts-classes';

import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TasksService {
  selectedTask: Task;
  foundTasks: Task[];
  allTasks: Task[];

  constructor(
    private http: HttpClient
  ) {}

  getMatchingTasks(pattern: string): Observable<Task[]> {
    const url = localStorage.getItem('url');

    if (!url) {
      return;
    }

    return this.http
      .get<Task[]>(API_URL + '/tasks/get?searchText=' + pattern, {
        headers: {
          'X-Api-Base-Url': url
        }
      });
  }
}
