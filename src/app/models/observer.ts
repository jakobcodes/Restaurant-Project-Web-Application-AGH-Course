import { Subject } from "./subject";

export interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
  }