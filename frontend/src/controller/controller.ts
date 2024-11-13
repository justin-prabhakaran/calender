import axios from 'axios';

export type Events = {
    id: number;
    title: string;
    description: string;
    date: Date;
}

export class Controller {
    private uri: string = 'http://localhost:3000/v1/api';  // Ensure http/https is specified for the base URL

    // Get a specific event by ID
    async getEvent(id: string) {
        try {
            const res = await axios.get<Events>(`${this.uri}/event/${id}`);
            console.log(res.data);
            return res.data;  // Return the Event data if successful
        } catch (error) {
            console.error('Error getting event:', error);
            throw error;
        }
    }

    // Get all events
    async getAllEvents() {
        try {
            const res = await axios.get<Events[]>(`${this.uri}/events`);
            console.log(res.data);
            return res.data;  // Return an array of Events if successful
        } catch (error) {
            console.error('Error getting all events:', error);
            throw error;
        }
    }

    // Save a new event
    async saveEvent(event: Events) {
        try {
            const res = await axios.post<Events[]>(`${this.uri}/event`, event);
            console.log(res.data as Events[]);
            return res.data as Events[];  // Return the saved Event data if successful
        } catch (error) {
            console.error('Error saving event:', error);
            throw error;
        }
    }

    // Update an event
    async updateEvent(event: Events) {
        try {
            const res = await axios.put<Events[]>(`${this.uri}/event`, event);
            console.log(res.data);
            return res.data as Events[];  // Return the updated Event data if successful
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    // Delete an event by ID
    async deleteEvent(event: Events) {
        try {
            const res = await axios.delete<Events[]>(`${this.uri}/event/${event.id}`);
            console.log(res.data);
            return res.data as Events[];  // Return the response from deletion if successful
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
}
