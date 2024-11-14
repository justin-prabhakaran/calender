# Calendar Application
This project is a full-stack calendar application designed to manage events with both frontend and backend components. It provides event management functionality, real-time notifications, and a responsive user interface for an enhanced user experience

## Project Structure
- **Backend**: Built with NestJS, this backend API manages event data, server-side functionality, and real-time notifications via WebSocket.
- **Frontend**: Created using React and TypeScript, with Vite for fast builds and Tailwind CSS for styling.

## Features
- **Event Management**: Create, read, update, and delete calendar events.
- **Real-time Notifications**: Receive notifications when an event is triggered. Events can be snoozed directly from the notification.
- **Responsive UI**: A user-friendly interface with customizable calendar views and seamless interactions.
- **Socket Integration**: Real-time data synchronization between the client and server using WebSocket.
- **API Integration**: Backend API for managing event data.
## Getting Started1
### Prerequisites
Ensure you have the following installed:

- Node.js (v14+)
- npm (v6+)

### Installation
#### Clone the repository:

```bash
git clone <repository-url>
cd calender-main
```
#### Install dependencies:

- Backend:

``` bash
cd backend
npm install
```
- Frontend:

``` bash
cd ../frontend
npm install
```
#### Running the Application
 - Backend:

```bash
cd backend
npm run start
```
 - Frontend:

```bash
cd ../frontend
npm run dev
```

The frontend will typically run on http://localhost:5173/ and the backend on http://localhost:3000/ .

#### Real-time Notifications and Socket Integration
This application uses WebSocket to provide real-time notifications for events:

**Notification on Event Trigger**: When an event's scheduled time arrives, a notification is sent to the user with options to view or snooze the event.
**Snooze Feature**: Users can choose to snooze an event notification, rescheduling it for a specified number of minutes.
**Socket Integration**: The frontend establishes a WebSocket connection with the backend on port 3003 (http://localhost:3003/), ensuring real-time updates and responsiveness.

## Folder Structure
- **backend**: Contains server-side code, models, controllers, and services.
- **frontend**: Contains client-side code, including UI components and controllers.