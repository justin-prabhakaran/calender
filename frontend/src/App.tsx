import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Nav } from "@/components/ui/nav.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Data, DataProps } from "@/components/ui/data.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CustomDialog } from "@/components/ui/custom_dialog.tsx";
import { Controller, Events } from "@/controller/controller.ts"; // Import Controller

function App() {
    const [events, setEvents] = useState<Events[]>([]); // State for events
    const [data, setData] = useState<DataProps[]>([]); // State for formatted data

    // Create an instance of Controller
    const controller = new Controller();

    // Fetch all events on component mount
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
    }, []); // Empty dependency array ensures this runs only once on mount

    // Format events into data for rendering
    useEffect(() => {
        const formattedData: DataProps[] = events.map((event) => ({
            title: event.title,
            date: event.date,
            description: event.description,
        }));
        setData(formattedData);
    }, [events]); // Recalculate formatted data whenever events change

    // Handle adding a new event
    const handleSaveEvent = async (title: string, description: string, date: Date) => {
        console.log("Saving Event:", title);

        const newEvent: Events = {
            id: Math.random(), // Temporary ID
            title,
            description,
            date,
        };

        try {
            const updatedEvents = await controller.saveEvent(newEvent); // Save event
            setEvents(updatedEvents); // Update state with new events list
        } catch (error) {
            console.error("Error saving event:", error);
        }
    };

    const handleUpdateEvent = async (title: string, description: string, date: Date) => {
        //TODO
    };

    // Get selected dates based on events
    const handleGetSelected = (): Date[] => {
        return events.map((event) => event.date);
    };

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
                        selected={handleGetSelected()}
                        onSelect={() => {}}
                    />
                    <CustomDialog
                        data={{
                            title: "Add Event",
                            button: <Button className="mt-10 w-[70%]">Add Event</Button>,
                            description: "Add Event here. Click save when you're done",
                            onSave: handleSaveEvent,
                        }}
                    />
                </div>
                <Separator className="h-[100vh]" orientation="vertical" />

                <div className="my-5 mx-5">
                    <h1 className="text-2xl font-semibold mb-4">Events</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {data.map((d: DataProps, index) => (
                            <Data key={index} data={d}  editButton={
                                    <CustomDialog data={{
                                        title : "Edit Event" ,
                                        button : <button>edit</button>,
                                        description : "Add Event here. Click save when you're done",
                                        onSave: handleSaveEvent,
                                    }} />
                            } />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
