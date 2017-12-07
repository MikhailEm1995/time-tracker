import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  title = 'MVM-1212: whatever you do';

  description = 'Do something with this task!';

  constructor() { }

  ngOnInit() {
  }

}
