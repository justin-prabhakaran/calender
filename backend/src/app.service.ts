// app.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { Events } from './model/events';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppService {
  private eventsList: Events[] = [];

  constructor(private readonly eventEmitter: EventEmitter2) {}

  getAllEvents(): Events[] {
    return this.eventsList;
  }

  saveEvent(event: Events): Events[] {
    this.eventsList.push(event);
    this.eventEmitter.emit('eventsUpdated', this.eventsList); // Emit an event after saving
    return this.eventsList;
  }

  updateEvent(event: Events): Events[] {
    const existingEvent = this.getEvent(event.id);

    existingEvent.title = event.title;
    existingEvent.date = event.date;
    existingEvent.description = event.description;

    this.eventEmitter.emit('eventsUpdated', this.eventsList); // Emit an event after updating
    return this.eventsList;
  }

  snoozeEvent(id: string, minutes: number): Events[] {
    const event = this.getEvent(id);
    event.date = new Date(event.date.getTime() + minutes * 60000); // Snooze the event by X minutes
    this.eventEmitter.emit('eventsUpdated', this.eventsList); // Emit an event after snoozing
    return this.eventsList;
  }

  getEvent(id: string): Events {
    const event = this.eventsList.find((e) => e.id === id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  deleteEvent(id: string): Events[] {
    const index = this.eventsList.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException('Event not found');
    }
    this.eventsList.splice(index, 1);
    this.eventEmitter.emit('eventsUpdated', this.eventsList); // Emit an event after deletion
    return this.eventsList;
  }
}
