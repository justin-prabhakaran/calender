// socketGateway.ts

import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { AppService } from '../app.service';
import { Events } from '../model/events';
import { EventEmitter2 } from '@nestjs/event-emitter';

@WebSocketGateway(3003, { cors: { origin: '*' } })
@Injectable()
export class SocketGateway implements OnModuleInit, OnModuleDestroy {
    @WebSocketServer()
    server;

    private readonly logger = new Logger(SocketGateway.name);
    private interval;

    constructor(
        private readonly appService: AppService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    onModuleInit() {
        this.setupEventUpdateListener();
        this.setupInterval();
    }

    onModuleDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private setupEventUpdateListener() {
        this.eventEmitter.on('eventsUpdated', (events: Events[]) => {
            this.logger.log('Events updated: ' + events.length);
            this.checkAndEmitEvents(events);
        });
    }

    private setupInterval() {
        this.interval = setInterval(() => {
            const events = this.appService.getAllEvents();
            this.checkAndEmitEvents(events);
        }, 1000);
    }

    private checkAndEmitEvents(events: Events[]) {
        const currentDate = new Date();
        events.forEach((event) => {
            const eventDate = new Date(event.date);
            if (
                eventDate.getFullYear() === currentDate.getFullYear() &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getDate() === currentDate.getDate() &&
                eventDate.getHours() === currentDate.getHours() &&
                eventDate.getMinutes() === currentDate.getMinutes()
            ) {
                this.logger.log(`Emitting event: ${event.title}`);
                this.server.emit('eventTriggered', event);
                this.appService.deleteEvent(event.id);
            }
        });
    }

    @SubscribeMessage('snoozeEvent')
    handleSnoozeEvent(@MessageBody() data: { id: string; minutes?: number }) {
        const { id, minutes = 5 } = data;
        this.logger.log(`Snoozing event with ID: ${id} by ${minutes} minutes`);

        try {
            const updatedEvents = this.appService.snoozeEvent(id, minutes);
            this.server.emit('eventsUpdated', updatedEvents);
            this.logger.log(`Event with ID ${id} has been snoozed`);
        } catch (error) {
            this.logger.error(`Error snoozing event with ID ${id}: ${error.message}`);
        }
    }
}
