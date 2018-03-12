export class Task {
  id: string;
  summary: string;
  description: string;

  constructor({ id, summary, description } = { id: '', summary: '', description: '' }) {
    this.id = id || '';
    this.summary = summary || '';
    this.description = description || '';
  }
}

class Time {
  hours: number;
  minutes: number;
}

export class TrackableData {
  started: string;
  comment: string;
  time: Time;
  taskId: string;

  constructor(
    taskId: string
  ) {
    this.taskId = taskId;
    this.started = new Date().toISOString();
    this.time = new Time();
  }
}
