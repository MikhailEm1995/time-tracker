import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  time = '00:00:00';

  started = false;

  inProgress = false;

  start() {
    this.started = true;
    this.inProgress = true;
  }

  pause() {
    this.inProgress = false;
  }

  stop() {
    this.started = false;
    this.inProgress = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
