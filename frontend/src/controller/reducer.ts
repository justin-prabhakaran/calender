import {Controller, Events} from "@/controller/controller.ts";
import {BehaviorSubject} from "rxjs";


class EventsBloc{
    private _eventController;
    private _controller;

    constructor() {
        this._eventController = new BehaviorSubject<Events[]>([]);
        this._controller = new Controller();
    }

    get events$(){
        return this._eventController.asObservable();

    }

    async addEvent(event  : Events) {
        const newEvent :Events[]= await this._controller.saveEvent(event);
        console.log("New event after add:", newEvent);
        this._eventController.next(newEvent);
    }

    async deleteEvent(event :Events) {
        const newEvent :Events[] = await this._controller.deleteEvent(event);
        this._eventController.next(newEvent);
    }

    async fetchAllEvents() {
        const events = await this._controller.getAllEvents();
        this._eventController.next(events);
    }

    dispose() {
        this._eventController.complete();
    }
}

export const eventBloc = new EventsBloc();
