import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  autocompleteControl: FormControl = new FormControl();

  tasks: string[] = ['task 1', 'what 2', 'task 3', 'gfdbhohjis 4', 'task 5', 'task 6'];

  filteredTasks: Observable<string[]>;

  selected: string = this.tasks[0];

  ngOnInit() {
    this.filteredTasks = this.autocompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.tasks.filter(task =>
      task.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
}
