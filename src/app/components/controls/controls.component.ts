import { Component } from '@angular/core';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent{

  time = '00:00:00';

  started = false;

  inProgress = false;

  onToggle(): void {
    this.started ? this.pause() : this.start();
  }

  start(): void {
    this.started = true;
    this.inProgress = true;
  }

  pause(): void {
    this.inProgress = false;
  }

  stop(): void {
    this.started = false;
    this.inProgress = false;
  }

}
