import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Nav } from "@/components/ui/nav.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Data } from "@/components/ui/data.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CustomDialog } from "@/components/ui/custom_dialog.tsx";
import { Controller, Events } from "@/controller/controller.ts";
import {io} from "socket.io-client"
import {toast} from "sonner";
import {Toaster} from "@/components/ui/sonner.tsx";




function App() {
    const [events, setEvents] = useState<Events[]>([]); // State for events
    const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const controller = new Controller();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await controller.getAllEvents();
                setEvents(allEvents); // Update state with fetched events
                setFilteredEvents(allEvents); // Initially show all events
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    useEffect(() => {
        const dates: Date[] = events.map((e) => new Date(e.date));
        setSelectedDates(dates);
    }, [events]);

    useEffect(() => {

        if (searchQuery) {
            const filtered = events.filter((event) =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEvents(filtered);
        } else {
            setFilteredEvents(events);
        }
    }, [searchQuery, events]);

    const handleSaveEvent = async (id: number, title: string, description: string, date: Date) => {
        console.log("Saving Event:", title);

        const newEvent: Events = {
            id: date.toDateString() + title,
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

    const handleDeleteEvent = async (event: Events) => {
        console.log("Deleting Event:", event.title);

        try {
            const updatedEvents = await controller.deleteEvent(event); // Delete event
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleUpdateEvent = async (id: string, title: string, description: string, date: Date) => {
        try {
            const updatedEvent: Events = { id: id, title, description, date };
            const updatedEvents = await controller.updateEvent(updatedEvent); // Update event
            setEvents(updatedEvents); // Update state with the new events list
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        const socket = io("http://localhost:3003");

        socket.on('eventTriggered',(event : Events) =>{
            console.log("Recieved notif : " + event.title);
            // toast({
            //     title : "Times Up !!!!",
            //     description : event.title,
            //     action : (
            //         <ToastAction altText={"Snooze"}>Snooze</ToastAction>
            //     )
            // })

            toast('Times Up!!',{
                description: event.title + "is Started !!"
            })
        });


        return ()=>{
            socket.close();
        }
    }, []);

    return (
        <>
            <Nav onSearch={handleSearch} />
            <Button onClick={() => {
                toast('Times Up!!',{
                    description: "test"
                })
            }}>
                Trigger Test Toast
            </Button>
            <Toaster  />
            <Separator className="mt-[30px]" />
            <div className="flex flex-row">
                <div className="flex flex-col mx-5 my-5 items-center">
                    <Calendar
                        className="w-[300px] h-[350px] rounded-md border"
                        style={{ width: "300px", height: "350px" }}
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(_date) => {}}
                    />
                    <CustomDialog
                        props={{
                            title: "Add Event",
                            button: <Button className="mt-10 w-[70%]">Add Event</Button>,
                            description: "Add Event here. Click save when you're done",
                            onSave: handleSaveEvent,
                        }}
                        data={{
                            isEdit: false,
                            event: { date: new Date(), title: "", description: "", id: '' },
                        }}
                    />
                </div>
                <Separator className="h-[100vh]" orientation="vertical" />

                <div className="my-5 mx-5">
                    <h1 className="text-2xl font-semibold mb-4">Events</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {filteredEvents.map((event: Events, index) => (
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
                                            isEdit: true,
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
