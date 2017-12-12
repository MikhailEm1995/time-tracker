import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {

  tasks: string[] = ['task 1', 'task 2', 'task 3', 'task 4', 'task 5', 'task 6'];

  selected = this.tasks[0];

  constructor() {}
}
