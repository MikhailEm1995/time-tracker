import { Injectable } from '@angular/core';

import { API_URL } from '../../constants/ts-variables';
import {Task, TrackableData} from '../../constants/ts-classes';

import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Router} from '@angular/router';

@Injectable()
export class TasksService {
  static selectedTask: BehaviorSubject<Task> = new BehaviorSubject(new Task());
  static isTracking: BehaviorSubject<boolean> = new BehaviorSubject(false);

  userUrl: any;

  trackableTask: TrackableData;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userUrl = localStorage.getItem('url');

    TasksService.selectedTask.subscribe((task) => {
      this.createTrackableTask(task.id);
    });
  }

  createTrackableTask(taskId: string): void {
    this.trackableTask = new TrackableData(taskId);
  }

  setDate(date) {
    const chosenDate = new Date(date);
    const currentDate = new Date();

    chosenDate.setHours(currentDate.getHours());
    chosenDate.setMinutes(currentDate.getMinutes());
    chosenDate.setSeconds(currentDate.getSeconds());

    this.trackableTask.started = chosenDate.toISOString();
  }

  updateTrackableTask(comment, hours, minutes): void {
    this.trackableTask.comment = comment;
    this.trackableTask.time.hours = hours;
    this.trackableTask.time.minutes = minutes;
  }

  persistTrackableTask(): void {
    Object.keys(this.trackableTask).forEach((key) => {
      if (key === 'time') {
        Object.keys(this.trackableTask.time).forEach((unit) => {
          localStorage.setItem(unit, this.trackableTask.time[unit]);
        });
      } else {
        localStorage.setItem(key, this.trackableTask[key]);
      }
    });
  }

  sendTask(comment = '', hours, minutes): Observable<any> {
    if (!this.userUrl) {
      this.router.navigate(['/auth']);
      return;
    }

    this.updateTrackableTask(comment, +hours, +minutes);
    this.persistTrackableTask();
    TasksService.isTracking.next(true);

    return this.http
      .post(API_URL + '/track', this.trackableTask, {
        headers: {
          'X-Api-Base-Url': this.userUrl
        },
        withCredentials: true
      });
  }

  getMatchingTasks(pattern: string): Observable<Task[]> {
    if (!this.userUrl) {
      this.router.navigate(['/auth']);
      return;
    }

    return this.http
      .get<Task[]>(API_URL + '/tasks/get?searchText=' + pattern, {
        headers: {
          'X-Api-Base-Url': this.userUrl
        },
        withCredentials: true
      });
  }

  getAllTasks(): Observable<Task[]> {
    if (!this.userUrl) {
      this.router.navigate(['/auth']);
      return;
    }

    return this.http
      .get<Task[]>(API_URL + '/mytasks/get', {
        headers: {
          'X-Api-Base-Url': this.userUrl
        },
        withCredentials: true
      });
  }
}
