import { Injectable, NotFoundException } from '@nestjs/common';
import { Events } from './model/events';

@Injectable()
export class AppService {
  // Initialize the events array to avoid undefined errors
  private events: Events[] = [];

  getAllEvents(): Events[] {
    return this.events;
  }

  getEvent(id: number): Events {
    const event = this.events.find((e) => e.id === id);
    if (event) {
      return event;
    }
    throw new NotFoundException('Event not found');
  }

  saveEvent(event: Events) {
    this.events.push(event); // Now this will work since events is initialized
    return this.events;
  }

  updateEvent(event: Events) {
    const existingEvent = this.getEvent(event.id); // Reuse the getEvent method to find the event

    // Update the event details
    existingEvent.title = event.title;
    existingEvent.date = event.date;
    existingEvent.description = event.description;

    return this.events;
  }

  deleteEvent(id: number) {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException('Event not found');
    }
    this.events.splice(index, 1);
    return this.events;
  }
}
