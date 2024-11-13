import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Nav } from "@/components/ui/nav.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Data } from "@/components/ui/data.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CustomDialog } from "@/components/ui/custom_dialog.tsx";
import { Controller, Events } from "@/controller/controller.ts"; // Import Controller

function App() {
    const [events, setEvents] = useState<Events[]>([]); // State for events
    const [selectedDates, setSelectedDates] = useState<Date[]>([]); // State for selected dates

    const controller = new Controller();


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await controller.getAllEvents();
                setEvents(allEvents); // Update state with fetched events
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);


    const handleSaveEvent = async (id : number,title: string, description: string, date: Date) => {
        console.log("Saving Event:", title);

        const newEvent: Events = {
            id : date.toDateString() + title,
            title,
            description,
            date,
        };

        try {
            const updatedEvents = await controller.saveEvent(newEvent); // Save event
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleDeleteEvent = async (event : Events) => {
        console.log("Saving Event:", event.title);

        try {
            const updatedEvents = await controller.deleteEvent(event);
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error saving event:", error);
        }
    }


    const handleUpdateEvent = async (eventId: string, title: string, description: string, date: Date) => {
        try {
            const updatedEvent: Events = { id: eventId, title, description, date };
            const updatedEvents = await controller.updateEvent(updatedEvent); // Update event
            setEvents(updatedEvents); // Update state with the new events list
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };



    useEffect(() => {
        const dates : Date[] = events.map((e) => new Date(e.date));
        setSelectedDates(dates)
    }, [events]);

    return (
        <>
            <Nav />
            <Separator className="mt-[30px]" />
            <div className="flex flex-row">
                <div className="flex flex-col mx-5 my-5 items-center">
                    <Calendar
                        className="w-[300px] h-[350px] rounded-md border"
                        style={{ width: "300px", height: "350px" }}
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(_)=>{}}
                    />
                    <CustomDialog
                        props={{
                            title: "Add Event",
                            button: <Button className="mt-10 w-[70%]">Add Event</Button>,
                            description: "Add Event here. Click save when you're done",
                            onSave: handleSaveEvent,
                        }}
                        data={{
                            isEdit: false, // No event is being edited, it's a new event
                            event: { date: new Date(), title: "", description: "", id: '' },
                        }}
                    />
                </div>
                <Separator className="h-[100vh]" orientation="vertical" />

                <div className="my-5 mx-5">
                    <h1 className="text-2xl font-semibold mb-4">Events</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {events.map((event: Events, index) => (
                            <Data
                                onDelete={handleDeleteEvent}
                                key={index}
                                event={event}
                                editButton={
                                    <CustomDialog
                                        props={{
                                            title: "Edit Event",
                                            button: <button>edit</button>,
                                            description: "Edit Event here. Click save when you're done",
                                            onSave: handleUpdateEvent,
                                        }}
                                        data={{
                                            isEdit: true, // Indicates this is an edit
                                            event: event,
                                        }}
                                    />
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
