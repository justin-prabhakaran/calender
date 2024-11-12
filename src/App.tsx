import React from "react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Nav} from "@/components/ui/nav.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Data, DataProps} from "@/components/ui/data.tsx";


function App() {

    const data : DataProps[] = [
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },
        {
            title : "jusin",
            description : "justin is good bye",
            date : new Date(),
        },

    ]

    const [selectedDates, setSelectedDates] = React.useState<Date[]>([
        new Date(), // Add dates you want to mark, e.g., today
        new Date(2024, 11, 25), // Another example date, December 25, 2024
    ]);

    const toggleDateSelection = (date : Date[] | undefined) => {


        console.log(date)
        if(date != null){
            setSelectedDates([...date ]);
        }
    };


    return (
        <>
            <Nav />
            <Separator className={"mt-[30px]"}/>
            <div className={"flex flex-row"}>
                <Calendar
                    className={"w-[300px] h-[350px] mx-5 my-5 rounded-md border"}
                    style={{
                        width: "300px",
                        height: "350px",
                    }}
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={toggleDateSelection}
                />
                <Separator className={"h-[100vh]"} orientation={"vertical"}/>

                <div className="my-5 mx-5">
                    <h1 className="text-2xl font-semibold mb-4">Events</h1>
                    <div className="grid grid-cols-4 gap-6">
                        {data.map((d: DataProps) => (
                            <Data key={Math.random()} data={d}/>
                        ))}
                    </div>
                </div>
            </div>


        </>
    );
}

export default App
